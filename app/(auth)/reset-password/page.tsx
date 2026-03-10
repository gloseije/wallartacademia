"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function ResetPasswordForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!token) {
			setError("Token invalide ou manquant.");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const { error } = await authClient.resetPassword({
				newPassword: newPassword,
				token: token,
			});

			if (error) {
				setError(error.message || "Une erreur est survenue.");
			} else {
				router.push("/login?reset=success");
			}
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Une erreur est survenue.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (!token) {
		return (
			<div className="text-center">
				<p className="text-red-500 mb-4 font-bold">
					Lien de réinitialisation invalide ou expiré.
				</p>
				<Link
					href="/forgot-password"
					className="text-primary hover:underline font-bold"
				>
					Demander un nouveau lien
				</Link>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
					{error}
				</div>
			)}
			<div className="space-y-2">
				<label className="text-sm font-bold ml-1" htmlFor="newPassword">
					Nouveau mot de passe
				</label>
				<div className="relative group">
					<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
					<input
						id="newPassword"
						type="password"
						placeholder="••••••••"
						required
						minLength={8}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="w-full pl-12 pr-4 py-4 bg-white/5 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/50 transition-all font-medium"
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading || !newPassword}
				className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
			>
				{isLoading ? (
					<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
				) : (
					<>
						Enregistrer
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</>
				)}
			</button>
		</form>
	);
}

export default function ResetPasswordPage() {
	return (
		<div className="flex flex-col w-full">
			{/* Header */}
			<div className="text-center mb-10">
				<h1 className="text-3xl font-black mb-2">
					Nouveau mot de passe
				</h1>
				<p className="text-muted-foreground text-sm">
					Entrez votre nouveau mot de passe ci-dessous.
				</p>
			</div>

			<Suspense
				fallback={
					<div className="text-center">
						<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block" />
					</div>
				}
			>
				<ResetPasswordForm />
			</Suspense>

			<div className="mt-10 pt-6 border-t border-black/10 text-center">
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
