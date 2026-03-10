import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { z } from "zod";
import { sendEmail } from "./email";
import {
	getResetPasswordEmailTemplate,
	getVerificationEmailTemplate,
} from "./email-templates";
import {
	generate6DigitOtp,
	getEmailVerificationOtpTtlMinutes,
	hashOtp,
} from "./email-verification-otp";
import crypto from "crypto";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: "Réinitialisation de votre mot de passe",
				html: getResetPasswordEmailTemplate(user.name, url),
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			const ttlMinutes = getEmailVerificationOtpTtlMinutes();
			const otpCode = generate6DigitOtp();
			const salt = crypto.randomBytes(16).toString("hex");
			const codeHash = hashOtp(otpCode, salt);
			const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

			await prisma.emailVerificationOtp.upsert({
				where: { email: user.email },
				update: {
					salt,
					codeHash,
					attempts: 0,
					expiresAt,
				},
				create: {
					email: user.email,
					salt,
					codeHash,
					expiresAt,
				},
			});

			const origin = new URL(url).origin;
			const verifyPageUrl = `${origin}/verify-email?email=${encodeURIComponent(
				user.email,
			)}`;

			await sendEmail({
				to: user.email,
				subject: "Vérifiez votre adresse email - wallart academia",
				html: getVerificationEmailTemplate({
					userName: user.name || "là",
					verifyPageUrl,
					otpCode,
					expiresMinutes: ttlMinutes,
				}),
			});
		},
	},
	baseURL: process.env.BETTER_AUTH_URL,
	secret: process.env.BETTER_AUTH_SECRET,
	rateLimit: {
		window: 60,
		max: 100,
		customRules: {
			"/sign-in/email": {
				window: 10,
				max: 3,
			},
			"/sign-up/email": {
				window: 10,
				max: 3,
			},
		},
	},
	hooks: {
		before: async (ctx) => {
			if ((ctx as { path: string }).path === "/sign-up/email") {
				const schema = z.object({
					name: z
						.string()
						.min(2, "Le nom doit contenir au moins 2 caractères."),
					email: z.email("L'adresse email n'est pas valide."),
					password: z
						.string()
						.min(
							8,
							"Le mot de passe doit contenir au moins 8 caractères.",
						)
						.regex(
							/[A-Za-z]/,
							"Le mot de passe doit contenir au moins une lettre.",
						)
						.regex(
							/[0-9]/,
							"Le mot de passe doit contenir au moins un chiffre.",
						),
				});

				const result = schema.safeParse(ctx.body);
				if (!result.success) {
					throw new Error(
						JSON.stringify(z.treeifyError(result.error)),
					);
				}
			}
			return { context: ctx };
		},
		after: async (ctx) => {
			// Envoyer l'email de vérification si sign-in avec email non vérifié
			if ((ctx as { path?: string }).path === "/sign-in/email") {
				try {
					// Essayer de récupérer l'email depuis le body
					const userEmail =
						(ctx.body as unknown as { email?: string })?.email ||
						"";
					const isEmailNotVerified =
						(ctx as { response?: { error?: { code?: string } } })
							?.response?.error?.code === "EMAIL_NOT_VERIFIED";

					if (userEmail && isEmailNotVerified) {
						console.log(
							`[Auth] Envoi email de vérification à ${userEmail} après tentative de sign-in`,
						);

						const ttlMinutes = getEmailVerificationOtpTtlMinutes();
						const otpCode = generate6DigitOtp();
						const salt = crypto.randomBytes(16).toString("hex");
						const codeHash = hashOtp(otpCode, salt);
						const expiresAt = new Date(
							Date.now() + ttlMinutes * 60 * 1000,
						);

						await prisma.emailVerificationOtp.upsert({
							where: { email: userEmail },
							update: {
								salt,
								codeHash,
								attempts: 0,
								expiresAt,
							},
							create: {
								email: userEmail,
								salt,
								codeHash,
								expiresAt,
							},
						});

						const origin =
							process.env.BETTER_AUTH_URL ||
							"http://localhost:3000";
						const verifyPageUrl = `${origin}/verify-email?email=${encodeURIComponent(
							userEmail,
						)}`;

						await sendEmail({
							to: userEmail,
							subject:
								"Vérifiez votre adresse email - wallart academia",
							html: getVerificationEmailTemplate({
								userName: "là",
								verifyPageUrl,
								otpCode,
								expiresMinutes: ttlMinutes,
							}),
						});

						console.log(
							`[Auth] Email de vérification envoyé à ${userEmail}`,
						);
					}
				} catch (error) {
					console.error(
						"[Auth] Erreur lors de l'envoi de l'email de vérification au sign-in:",
						error,
					);
				}
			}
			return { context: ctx };
		},
	},
});
