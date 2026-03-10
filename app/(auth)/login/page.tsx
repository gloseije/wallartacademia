"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
	Mail,
	Lock,
	Eye,
	EyeOff,
	Chrome,
	ArrowRight,
	AlertCircle,
} from "lucide-react";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
		{},
	);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	// Rediral automatique vers la page de vérification si email non vérifié
	useEffect(() => {
		if (error === "EMAIL_NOT_VERIFIED" && email) {
			const timer = setTimeout(() => {
				router.push(`/verify-email?email=${encodeURIComponent(email)}`);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [error, email, router]);

	const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		setError(null);
		setFieldErrors({});

		await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					window.location.href = "/";
				},
				onError: async (ctx) => {
					setIsPending(false);
					if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
						setError("EMAIL_NOT_VERIFIED");
						// Envoyer automatiquement l'email de vérification
						try {
							await authClient.sendVerificationEmail({
								email,
								callbackURL: "/",
							});
						} catch (error) {
							console.error(
								"Erreur lors de l'envoi du code:",
								error,
							);
						}
					} else if (ctx.error.status === 429) {
						setError(
							"Trop de tentatives de connexion. Veuillez patienter un instant.",
						);
					} else if (
						ctx.error.status === 401 ||
						ctx.error.status === 403
					) {
						setError("Email ou mot de passe incorrect.");
					} else {
						setError(
							ctx.error.message || "Une erreur est survenue.",
						);
					}
				},
			},
		);
	};

	const handleResendVerification = async () => {
		setIsPending(true);
		try {
			const { error } = await authClient.sendVerificationEmail({
				email,
				callbackURL: "/",
			});
			if (error) {
				setError(error.message || "Une erreur est survenue.");
			} else {
				setError("Un nouvel e-mail de vérification a été envoyé.");
			}
		} catch {
			setError("Erreur lors de l'envoi de l'e-mail.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="flex flex-col w-full">
			{/* Header */}
			<div className="text-center mb-10">
				<h1 className="text-2xl font-black mb-2">
					Connectez-vous à votre compte
				</h1>
			</div>

			{/* Affichage de l'erreur du serveur */}
			{error && error === "EMAIL_NOT_VERIFIED" ? (
				<div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex flex-col items-center justify-center gap-3 text-center text-orange-500 text-sm font-bold animate-in fade-in slide-in-from-top-2">
					<div className="flex items-center gap-2">
						<AlertCircle className="w-5 h-5 shrink-0" />
						<p>Veuillez vérifier votre adresse email.</p>
					</div>
					<button
						type="button"
						onClick={handleResendVerification}
						disabled={isPending}
						className="mt-2 text-primary hover:underline transition-all flex items-center gap-2"
					>
						{isPending && (
							<div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
						)}
						Renvoyer l&apos;email de vérification
					</button>
					<Link
						href={
							email
								? `/verify-email?email=${encodeURIComponent(email)}`
								: "/verify-email"
						}
						className="text-xs font-black text-muted-foreground hover:text-primary transition-all"
					>
						J&apos;ai déjà un code OTP
					</Link>
				</div>
			) : error ? (
				<div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-2">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<p>{error}</p>
				</div>
			) : null}

			{/* On utilise l'attribut 'onSubmit' */}
			<form onSubmit={handleLogin} className="space-y-5">
				{/* Email */}
				<div className="space-y-2">
					<label className="text-sm font-bold ml-1" htmlFor="email">
						Email
					</label>
					<div className="relative group">
						<Mail
							className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${fieldErrors.email ? "text-red-500" : "text-muted-foreground group-focus-within:text-primary"}`}
						/>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="nom@exemple.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-background/50 transition-all font-medium ${
								fieldErrors.email
									? "border-red-500/50 focus:ring-red-500/20"
									: "border-black/10 focus:ring-primary/20"
							}`}
						/>
					</div>
					{fieldErrors.email && (
						<p className="text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
							{fieldErrors.email[0]}
						</p>
					)}
				</div>

				{/* Mot de passe */}
				<div className="space-y-2">
					<div className="flex justify-between items-center ml-1">
						<label className="text-sm font-bold" htmlFor="password">
							Mot de passe
						</label>
						<Link
							href="/forgot-password"
							className="text-xs font-bold text-primary hover:underline transition-all"
						>
							Oublié ?
						</Link>
					</div>
					<div className="relative group">
						<Lock
							className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${fieldErrors.password ? "text-red-500" : "text-muted-foreground group-focus-within:text-primary"}`}
						/>
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-background/50 transition-all font-medium ${
								fieldErrors.password
									? "border-red-500/50 focus:ring-red-500/20"
									: "border-black/10 focus:ring-primary/20"
							}`}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						>
							{showPassword ? (
								<EyeOff className="w-5 h-5" />
							) : (
								<Eye className="w-5 h-5" />
							)}
						</button>
					</div>
					{fieldErrors.password && (
						<p className="text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
							{fieldErrors.password[0]}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
				>
					{isPending ? (
						<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<>
							Se connecter
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</>
					)}
				</button>
			</form>

			{/* Divider */}
			<div className="relative my-8">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-white/10"></div>
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-4 text-muted-foreground font-bold">
						Ou continuer avec
					</span>
				</div>
			</div>

			{/* Social login */}
			<div className="flex flex-col gap-4">
				<button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-sm">
					<Chrome className="w-4 h-4" />
					Continuer avec Google
				</button>
			</div>

			{/* Footer */}
			<p className="text-center mt-10 text-sm text-muted-foreground">
				Pas encore de compte ?{" "}
				<Link
					href="/register"
					className="text-primary font-black hover:underline transition-all"
				>
					S&apos;inscrire
				</Link>
			</p>
		</div>
	);
}
