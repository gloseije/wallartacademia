import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { PrismaClient } from "@prisma/client";
import { verifyOtp } from "@/lib/email-verification-otp";
import { auth } from "@/lib/auth";
import { serializeSignedCookie } from "better-call";

type PrismaClientWithOtp = PrismaClient & {
	emailVerificationOtp: {
		findUnique: PrismaClient["user"]["findUnique"];
		delete: PrismaClient["user"]["delete"];
		update: PrismaClient["user"]["update"];
	};
};

const prismaWithOtp = prisma as PrismaClientWithOtp;

const schema = z.object({
	email: z.email(),
	code: z.string().regex(/^\d{6}$/),
});

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
	const json = await req.json().catch(() => null);
	const parsed = schema.safeParse(json);
	if (!parsed.success) {
		return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
	}

	const { email, code } = parsed.data;

	const otp = (await prismaWithOtp.emailVerificationOtp.findUnique({
		where: { email },
	} as never)) as {
		email: string;
		salt: string;
		codeHash: string;
		attempts: number;
		expiresAt: Date;
	} | null;

	if (!otp) {
		return NextResponse.json(
			{ error: "INVALID_CODE_OR_EXPIRED" },
			{ status: 400 },
		);
	}

	if (otp.expiresAt.getTime() <= Date.now()) {
		await prismaWithOtp.emailVerificationOtp.delete({
			where: { email },
		} as never);
		return NextResponse.json(
			{ error: "INVALID_CODE_OR_EXPIRED" },
			{ status: 400 },
		);
	}

	const ok = verifyOtp({
		code,
		salt: otp.salt,
		expectedHash: otp.codeHash,
	});

	if (!ok) {
		const attempts = otp.attempts + 1;
		if (attempts >= MAX_ATTEMPTS) {
			await prismaWithOtp.emailVerificationOtp.delete({
				where: { email },
			} as never);
			return NextResponse.json(
				{ error: "TOO_MANY_ATTEMPTS" },
				{ status: 429 },
			);
		}

		await prismaWithOtp.emailVerificationOtp.update({
			where: { email },
			data: { attempts },
		} as never);

		return NextResponse.json(
			{ error: "INVALID_CODE_OR_EXPIRED" },
			{ status: 400 },
		);
	}

	// Marquer l'email comme vérifié
	await prisma.user.updateMany({
		where: { email },
		data: { emailVerified: true },
	});

	await prismaWithOtp.emailVerificationOtp.delete({ where: { email } });

	// Récupérer l'utilisateur
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
	}

	// Créer une session via l'internal adapter de Better Auth
	const ctx = await auth.$context;
	const session = await ctx.internalAdapter.createSession(user.id);
	const cookieName = ctx.authCookies.sessionToken.name;
	const cookieOptions = {
		...ctx.authCookies.sessionToken.attributes,
		maxAge: ctx.sessionConfig.expiresIn,
	};

	const setCookieHeader = await serializeSignedCookie(
		cookieName,
		session.token,
		ctx.secret,
		cookieOptions,
	);

	const response = NextResponse.json({ ok: true });

	// Ajouter le header set-cookie signé directement
	response.headers.append("set-cookie", setCookieHeader);

	return response;
}
