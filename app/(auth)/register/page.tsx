"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
	User,
	Mail,
	Lock,
	Eye,
	EyeOff,
	ArrowRight,
	Check,
	AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
		{},
	);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!acceptedTerms) return;

		setIsPending(true);
		setError(null);
		setFieldErrors({});

		await authClient.signUp.email(
			{
				email,
				password,
				name,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					router.push(
						`/verify-email?email=${encodeURIComponent(email)}`,
					);
					router.refresh();
				},
				onError: (ctx) => {
					setIsPending(false);
					if (ctx.error.status === 422) {
						// Erreur de validation (Zod ou autre)
						setError("Veuillez vérifier les informations saisies.");
					} else if (ctx.error.status === 429) {
						setError(
							"Trop de tentatives d'inscription. Veuillez patienter un instant.",
						);
					} else if (ctx.error.message.includes("already exists")) {
						setFieldErrors({
							email: ["Cet email est déjà utilisé."],
						});
					} else {
						setError(
							ctx.error.message || "Une erreur est survenue.",
						);
					}
				},
			},
		);
	};

	return (
		<div className="flex flex-col w-full">
			{/* Header */}
			<div className="text-center mb-10">
				<h1 className="text-2xl font-black mb-2">Créer un compte</h1>
			</div>

			{/* Affichage de l'erreur du serveur */}
			{error && (
				<div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-2">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<p>{error}</p>
				</div>
			)}

			<form onSubmit={handleRegister} className="space-y-5">
				{/* Nom Complet */}
				<div className="space-y-2">
					<label className="text-sm font-bold ml-1" htmlFor="name">
						Nom complet
					</label>
					<div className="relative group">
						<User
							className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${fieldErrors.name ? "text-red-500" : "text-muted-foreground group-focus-within:text-primary"}`}
						/>
						<input
							id="name"
							name="name"
							type="text"
							placeholder="John Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-background/50 transition-all font-medium ${
								fieldErrors.name
									? "border-red-500/50 focus:ring-red-500/20"
									: "border-black/10 focus:ring-primary/20"
							}`}
						/>
					</div>
					{fieldErrors.name && (
						<p className="text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
							{fieldErrors.name[0]}
						</p>
					)}
				</div>

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
					<label
						className="text-sm font-bold ml-1"
						htmlFor="password"
					>
						Mot de passe
					</label>
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

				{/* Terms */}
				<div className="flex items-start gap-3 py-2">
					<button
						type="button"
						title="Accepter les conditions"
						onClick={() => setAcceptedTerms(!acceptedTerms)}
						className={`mt-0.5 w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
							acceptedTerms
								? "bg-primary border-primary text-primary-foreground"
								: "bg-white/5 border-black/40 text-transparent"
						}`}
					>
						<Check className="w-3.5 h-3.5 stroke-4" />
					</button>
					<p className="text-xs text-muted-foreground leading-relaxed">
						J&apos;accepte les{" "}
						<Link
							href="/terms"
							className="text-foreground font-bold hover:text-primary transition-colors"
						>
							Conditions d&apos;utilisation
						</Link>{" "}
						et la{" "}
						<Link
							href="/privacy"
							className="text-foreground font-bold hover:text-primary transition-colors"
						>
							Politique de confidentialité
						</Link>
						.
					</p>
				</div>

				<button
					type="submit"
					disabled={isPending || !acceptedTerms}
					className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
				>
					{isPending ? (
						<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<>
							Créer mon compte
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</>
					)}
				</button>
			</form>

			{/* Footer */}
			<p className="text-center mt-10 text-sm text-muted-foreground">
				Déjà un compte ?{" "}
				<Link
					href="/login"
					className="text-primary font-black hover:underline transition-all"
				>
					Se connecter
				</Link>
			</p>
		</div>
	);
}
