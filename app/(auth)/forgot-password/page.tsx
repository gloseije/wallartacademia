"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const { error } = await authClient.requestPasswordReset({
				email: email,
				redirectTo: "/reset-password",
			});

			if (error) {
				setError(error.message || "Une erreur est survenue.");
			} else {
				setIsSubmitted(true);
			}
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Une erreur est survenue.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col w-full">
			{/* Header */}
			<div className="text-center mb-10">
				<h1 className="text-3xl font-black mb-2">
					Mot de passe oublié ?
				</h1>
				<p className="text-muted-foreground text-sm">
					Pas de panique ! Entrez votre email pour réinitialiser.
				</p>
			</div>

			{!isSubmitted ? (
				<form onSubmit={handleSubmit} className="space-y-6">
					{error && (
						<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
							{error}
						</div>
					)}
					<div className="space-y-2">
						<label
							className="text-sm font-bold ml-1"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative group">
							<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
							<input
								id="email"
								type="email"
								placeholder="nom@exemple.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-12 pr-4 py-4 bg-white/5 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/50 transition-all font-medium"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
						) : (
							<>
								Envoyer le lien
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</>
						)}
					</button>
				</form>
			) : (
				<div className="text-center animate-fade-in py-4">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
						<CheckCircle2 className="w-10 h-10" />
					</div>
					<h2 className="text-2xl font-extrabold mb-3">
						Email envoyé !
					</h2>
					<p className="text-sm text-muted-foreground mb-8">
						Nous avons envoyé un lien de réinitialisation à votre
						adresse email. Veuillez vérifier votre boîte de
						réception.
					</p>
					<button
						onClick={() => setIsSubmitted(false)}
						className="text-primary font-black hover:underline transition-all"
					>
						Renvoyer l&apos;email
					</button>
				</div>
			)}

			<div className="mt-10 pt-6 border-t border-white/10 text-center">
				<Link
					href="/login"
					className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					Retour à la connexion
				</Link>
			</div>
		</div>
	);
}
