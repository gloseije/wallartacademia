"use client";

import {
	Suspense,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ClipboardEvent,
	type FormEvent,
	type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function VerifyEmailForm() {
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email") ?? "";

	const [email, setEmail] = useState(emailFromQuery);
	const [digits, setDigits] = useState<string[]>(() =>
		Array.from({ length: 6 }, () => ""),
	);
	const [error, setError] = useState<string | null>(null);
	const [info, setInfo] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	useEffect(() => {
		setEmail(emailFromQuery);
	}, [emailFromQuery]);

	useEffect(() => {
		inputsRef.current[0]?.focus();
	}, []);

	const code = useMemo(() => digits.join(""), [digits]);

	const setDigitAt = (idx: number, value: string) => {
		const next = [...digits];
		next[idx] = value;
		setDigits(next);
	};

	const handleChange = (idx: number, raw: string) => {
		setError(null);
		setInfo(null);

		const value = raw.replace(/\D/g, "");
		if (!value) {
			setDigitAt(idx, "");
			return;
		}

		// If user typed/pasted multiple digits into a single input.
		if (value.length > 1) {
			const next = [...digits];
			for (let i = 0; i < 6; i++) {
				next[i] = value[i] ?? "";
			}
			setDigits(next);
			const lastIndex = Math.min(value.length, 6) - 1;
			inputsRef.current[lastIndex]?.focus();
			return;
		}

		setDigitAt(idx, value);
		if (idx < 5) inputsRef.current[idx + 1]?.focus();
	};

	const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			if (digits[idx]) {
				setDigitAt(idx, "");
				return;
			}
			if (idx > 0) inputsRef.current[idx - 1]?.focus();
		}
	};

	const handlePaste = (e: ClipboardEvent) => {
		const text = e.clipboardData.getData("text").replace(/\D/g, "");
		if (!text) return;
		e.preventDefault();

		const next = Array.from({ length: 6 }, (_, i) => text[i] ?? "");
		setDigits(next);
		const lastIndex = Math.min(text.length, 6) - 1;
		inputsRef.current[Math.max(0, lastIndex)]?.focus();
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Validation de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			setError("Veuillez entrer une adresse email valide.");
			setIsPending(false);
			return;
		}

		// Validation du code
		if (code.length !== 6) {
			setError("Le code doit contenir 6 chiffres.");
			setIsPending(false);
			return;
		}

		setIsPending(true);
		setError(null);
		setInfo(null);

		try {
			const res = await fetch("/api/email-verification/verify-otp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, code }),
				credentials: "include",
			});

			if (!res.ok) {
				const body = (await res.json().catch(() => null)) as {
					error?: string;
				} | null;

				if (body?.error === "TOO_MANY_ATTEMPTS") {
					setError(
						"Trop de tentatives. Demandez un nouveau code puis réessayez.",
					);
				} else {
					setError("Code invalide ou expiré.");
				}
				return;
			}

			window.location.href = "/";
		} catch {
			setError("Une erreur est survenue. Veuillez réessayer.");
		} finally {
			setIsPending(false);
		}
	};

	const handleResend = async () => {
		setIsPending(true);
		setError(null);
		setInfo(null);

		try {
			const { error } = await authClient.sendVerificationEmail({
				email,
				callbackURL: "/",
			});
			if (error) {
				setError(error.message || "Une erreur est survenue.");
				return;
			}
			setInfo("Un nouveau code a été envoyé.");
			setDigits(Array.from({ length: 6 }, () => ""));
			inputsRef.current[0]?.focus();
		} catch {
			setError("Erreur lors de l'envoi du code.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="flex flex-col w-full">
			<div className="text-center mb-10">
				<h1 className="text-2xl font-black mb-2">Vérification email</h1>
				<p className="text-muted-foreground text-sm">
					Saisissez le code à 6 chiffres envoyé à votre adresse email.
				</p>
			</div>

			{error && (
				<div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-2">
					{error}
				</div>
			)}
			{info && (
				<div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
					{info}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<label className="text-sm font-bold ml-1" htmlFor="email">
						Email
					</label>
					<div className="relative group">
						<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							id="email"
							name="email"
							type="email"
							placeholder="nom@exemple.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full pl-12 pr-4 py-4 bg-white/5 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/50 transition-all font-medium"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-bold ml-1">
						Code (6 chiffres)
					</label>
					<div
						className="grid grid-cols-6 gap-3"
						onPaste={handlePaste}
					>
						{digits.map((d, idx) => (
							<input
								key={idx}
								ref={(el) => {
									inputsRef.current[idx] = el;
								}}
								type="text"
								maxLength={1}
								aria-label={`Chiffre ${idx + 1}`}
								value={d}
								onChange={(e) =>
									handleChange(idx, e.target.value)
								}
								onKeyDown={(e) => handleKeyDown(idx, e)}
								className="h-14 text-center text-xl font-black tracking-widest bg-white/5 border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/50 transition-all"
							/>
						))}
					</div>
				</div>

				<button
					type="submit"
					disabled={isPending || code.length !== 6}
					className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
				>
					{isPending ? (
						<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<>
							Valider le code
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</>
					)}
				</button>

				<div className="flex flex-col gap-3">
					<button
						type="button"
						onClick={handleResend}
						disabled={isPending || !email}
						className="w-full py-4 bg-white/5 border border-black/10 rounded-2xl font-black text-sm hover:bg-white/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
					>
						<ShieldCheck className="w-4 h-4" />
						Renvoyer un code
					</button>
				</div>
			</form>

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

export default function VerifyEmailPage() {
	return (
		<Suspense
			fallback={
				<div className="text-center">
					<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block" />
				</div>
			}
		>
			<VerifyEmailForm />
		</Suspense>
	);
}
