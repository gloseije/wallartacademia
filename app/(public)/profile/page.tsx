"use client";

import { authClient } from "@/lib/auth-client";
import {
	Mail,
	Calendar,
	BadgeCheck,
	Shield,
	Camera,
	Edit,
	ArrowRight,
	Settings,
	Brush,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function ProfilePage() {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (isPending) return;

		if (!session) {
			router.push("/login");
			return;
		}

		if (!session.user.emailVerified) {
			const email = session.user.email ?? "";
			const query = email ? `?email=${encodeURIComponent(email)}` : "";
			router.push(`/verify-email${query}`);
		}
	}, [session, isPending, router]);

	if (isPending) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-stone-50">
				<div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
			</div>
		);
	}

	if (!session) return null;

	const user = session.user;

	return (
		<div className="relative min-h-screen bg-stone-50 flex flex-col">
			{/* Texture de fond (toile) très légère sur toute la page */}
			<div className="fixed inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMjBhMjAgMjAgMCAwIDEgMjAgMjAgMjAgMjAgMCAwIDEtNDAgMCAyMCAyMCAwIDAgMSAyMC0yMHoiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')] repeat opacity-30" />
			{/* Taches de peinture floues en arrière-plan (primaires/secondaires) */}
			<div className="fixed top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
			<div className="fixed bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

			<Header />

			<main className="grow pt-32 pb-20">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
					{/* Profile Header Card */}
					<div className="relative bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
						{/* Bande décorative (coup de pinceau) avec primaire/secondaire */}
						<div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20" />

						<div className="relative pt-16 pb-8 px-8 flex flex-col md:flex-row items-center md:items-end gap-6">
							{/* Avatar */}
							<div className="relative">
								<div className="w-28 h-28 rounded-full bg-white p-1 shadow-xl border border-stone-200">
									<div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center text-stone-700 font-black text-3xl overflow-hidden border-2 border-stone-200">
										{user.image ? (
											<Image
												src={user.image}
												alt={user.name}
												width={112}
												height={112}
												className="object-cover"
											/>
										) : (
											<span>{user.name.charAt(0)}</span>
										)}
									</div>
								</div>
								<button
									title="Modifier la photo de profil"
									className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all"
								>
									<Camera size={16} />
								</button>
							</div>

							<div className="flex-1 text-center md:text-left">
								<div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
									<h1 className="text-3xl font-black text-stone-800 tracking-tight">
										{user.name}
									</h1>
									<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">
										<BadgeCheck size={12} />
										Apprenant
									</span>
								</div>
								<p className="text-stone-500 font-medium flex items-center justify-center md:justify-start gap-2">
									<Mail size={16} className="text-primary" />
									{user.email}
								</p>
							</div>

							<div className="flex gap-3">
								<button className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-2xl transition-all flex items-center gap-2 border border-stone-200 shadow-sm">
									<Settings size={18} />
									Paramètres
								</button>
								<button className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-stone-800/20 hover:scale-105 active:scale-95">
									<Edit size={18} />
									Modifier
								</button>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Account Details */}
						<div className="md:col-span-2 space-y-6">
							<div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg">
								<h2 className="text-xl font-black text-stone-800 mb-6 flex items-center gap-3">
									<Shield className="text-primary" size={24} />
									Détails du compte
									{/* Petit trait de pinceau sous le titre */}
									<svg
										className="w-16 h-2 text-primary/40 ml-2"
										viewBox="0 0 60 4"
										preserveAspectRatio="none"
									>
										<path
											d="M0 2 Q15 0, 30 2 T60 2"
											stroke="currentColor"
											strokeWidth="1.5"
											fill="transparent"
										/>
									</svg>
								</h2>

								<div className="space-y-4">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200">
										<span className="text-xs font-black text-stone-500 uppercase tracking-widest">
											Nom complet
										</span>
										<span className="font-bold text-stone-800">
											{user.name}
										</span>
									</div>

									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200">
										<span className="text-xs font-black text-stone-500 uppercase tracking-widest">
											Adresse Email
										</span>
										<span className="font-bold text-stone-800">
											{user.email}
										</span>
									</div>

									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200">
										<span className="text-xs font-black text-stone-500 uppercase tracking-widest">
											Membre depuis
										</span>
										<div className="flex items-center gap-2 font-bold text-stone-800">
											<Calendar className="w-4 h-4 text-primary" />
											{user.createdAt
												? new Date(user.createdAt).toLocaleDateString(
														"fr-FR",
														{
															day: "numeric",
															month: "long",
															year: "numeric",
														}
												  )
												: "N/A"}
										</div>
									</div>
								</div>
							</div>

							{/* Activité récente */}
							<div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg overflow-hidden relative group">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-black text-stone-800 flex items-center gap-2">
										<Brush className="w-5 h-5 text-primary" />
										Activité récente
									</h2>
									<Link
										href="/student"
										className="text-primary text-sm font-bold hover:underline flex items-center gap-1 group"
									>
										Voir tout
										<ArrowRight
											size={14}
											className="group-hover:translate-x-1 transition-transform"
										/>
									</Link>
								</div>
								<div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
									<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary/40 mx-auto mb-4">
										<Calendar size={32} />
									</div>
									<p className="text-stone-600 font-bold">
										Aucune activité récente à afficher.
									</p>
									<p className="text-sm text-stone-400 mt-1 uppercase tracking-widest">
										Commencez un cours pour voir votre progression
									</p>
								</div>
							</div>
						</div>

						{/* Colonne latérale */}
						<div className="space-y-6">
							{/* Carte "Mes Cours" */}
							<div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
								<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
								<h3 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-1">
									Mes Cours
								</h3>
								<p className="text-6xl font-black text-stone-800 mb-8">0</p>
								<Link
									href="/courses"
									className="inline-flex items-center gap-2 text-sm font-black bg-stone-800 hover:bg-stone-700 text-stone-100 px-6 py-3 rounded-2xl transition-all border border-stone-700 shadow-md"
								>
									Explorer les ateliers
									<ArrowRight size={18} />
								</Link>
							</div>

							{/* Progression globale */}
							<div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg">
								<h3 className="text-stone-800 font-black mb-6 uppercase tracking-widest text-xs">
									Progression globale
								</h3>
								<div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden mb-4 p-0.5">
									<div className="w-[0%] h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
								</div>
								<div className="flex justify-between items-center">
									<span className="text-[10px] font-black text-stone-500 uppercase">
										Cours complétés
									</span>
									<span className="text-xl font-black text-primary">
										0%
									</span>
								</div>
							</div>

							{/* Prochaine étape */}
							<div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg">
								<h3 className="text-stone-800 font-black mb-4 uppercase tracking-widest text-xs">
									Prochaine étape
								</h3>
								<p className="text-sm text-stone-500 mb-4">
									Complétez votre premier module pour débloquer votre certificat.
								</p>
								<Link
									href="/courses"
									className="text-primary text-sm font-bold flex items-center gap-2 group"
								>
									Trouver un cours
									<ArrowRight
										size={16}
										className="group-hover:translate-x-1 transition-transform"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}