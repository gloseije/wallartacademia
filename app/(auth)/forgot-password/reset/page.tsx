"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		// Logique de réinitialisation ici
		setTimeout(() => setIsLoading(false), 2000);
	};

	return (
		<div className="flex flex-col w-full">
			{/* Header */}
			<div className="text-center mb-10">
				<h1 className="text-3xl font-black mb-2">
					Nouveau mot de passe
				</h1>
				<p className="text-muted-foreground text-sm">
					Choisissez un mot de passe fort pour votre compte.
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="space-y-2">
					<label
						className="text-sm font-bold ml-1"
						htmlFor="password"
					>
						Nouveau mot de passe
					</label>
					<div className="relative group">
						<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							required
							className="w-full pl-12 pr-12 py-4 bg-white/5 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/50 transition-all font-medium"
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
				</div>

				<div className="space-y-2">
					<label
						className="text-sm font-bold ml-1"
						htmlFor="confirm-password"
					>
						Confirmer le mot de passe
					</label>
					<div className="relative group">
						<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							id="confirm-password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							required
							className="w-full pl-12 pr-12 py-4 bg-white/5 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/50 transition-all font-medium"
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
							Réinitialiser
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</>
					)}
				</button>
			</form>

			{/* Footer */}
			<p className="text-center mt-10 text-sm text-muted-foreground">
				Retourner à la{" "}
				<Link
					href="/login"
					className="text-primary font-black hover:underline transition-all"
				>
					Page de connexion
				</Link>
			</p>
		</div>
	);
}
