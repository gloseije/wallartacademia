"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
	Menu,
	X,
	User,
	LogOut,
	BookOpen,
	Settings,
	ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { NavLink } from "./nav-link";
import { MobileNavLink } from "./mobile-nav-link";
import { UserDropdownItem } from "./user-dropdown-item";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	// Détection du scroll
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Fermer le menu mobile lors du changement de route (ajustement pendant le rendu)
	const [prevPathname, setPrevPathname] = useState(pathname);
	if (pathname !== prevPathname) {
		setPrevPathname(pathname);
		setIsMobileMenuOpen(false);
	}

	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
				},
			},
		});
	};

	// Classes dynamiques pour le header
	const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
		isScrolled
			? "bg-white/90 backdrop-blur-md shadow-lg py-2"
			: "bg-transparent py-4"
	}`;

	return (
		<header className={headerClasses}>
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="w-1/3">
						<Link
							href="/"
							className="flex items-center space-x-1 group"
						>
							<Image
								src="/wallartacademia.PNG"
								alt="Logo"
								width={100}
								height={100}
							/>
						</Link>
					</div>

					{/* Navigation desktop */}
					<div className="hidden md:flex justify-center items-center gap-8 w-1/3">
						<NavLink href="/">Accueil</NavLink>
						<NavLink href="/courses">Cours</NavLink>
						<NavLink href="/about">À propos</NavLink>
					</div>

					{/* Boutons desktop / User Menu */}
					<div className="hidden md:flex justify-end items-center gap-4 w-1/3">
						{isPending ? (
							<div className="h-10 w-24 bg-gray-100 rounded-xl animate-pulse" />
						) : session ? (
							<div className="relative">
								<button
									onClick={() =>
										setIsUserMenuOpen(!isUserMenuOpen)
									}
									className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 group"
								>
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all">
										{session.user.image ? (
											<Image
												src={session.user.image}
												alt={session.user.name}
												width={40}
												height={40}
											/>
										) : (
											<span>
												{session.user.name.charAt(0)}
											</span>
										)}
									</div>
									<div className="text-left hidden sm:block">
										<p className="text-sm font-bold leading-none">
											{session.user.name}
										</p>
										<p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
											Étudiant
										</p>
									</div>
									<ChevronDown
										size={14}
										className={`text-muted-foreground transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
									/>
								</button>

								{/* Dropdown Menu */}
								{isUserMenuOpen && (
									<>
										<div
											className="fixed inset-0 z-10"
											onClick={() =>
												setIsUserMenuOpen(false)
											}
										/>
										<div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
											<div className="px-4 py-3 border-b border-gray-50 mb-1">
												<p className="text-sm font-bold text-gray-900">
													{session.user.name}
												</p>
												<p className="text-xs text-gray-500 truncate">
													{session.user.email}
												</p>
											</div>

											<UserDropdownItem
												href="/student"
												icon={<BookOpen size={16} />}
												label="Mes cours"
											/>
											<UserDropdownItem
												href="/profile"
												icon={<User size={16} />}
												label="Profil"
											/>
											<UserDropdownItem
												href="/settings"
												icon={<Settings size={16} />}
												label="Paramètres"
											/>

											<div className="border-t border-gray-50 mt-1 pt-1">
												<button
													onClick={handleSignOut}
													className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
												>
													<LogOut size={16} />
													Déconnexion
												</button>
											</div>
										</div>
									</>
								)}
							</div>
						) : (
							<>
								<Link
									href="/login"
									className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors px-4 py-2"
								>
									Connexion
								</Link>
								<Link
									href="/register"
									className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-sm font-bold text-white bg-linear-to-r from-primary to-primary/80 rounded-xl group hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
								>
									<span className="relative">
										S&#39;inscrire
									</span>
								</Link>
							</>
						)}
					</div>

					{/* Bouton menu mobile */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
						type="button"
					>
						{isMobileMenuOpen ? (
							<X size={24} />
						) : (
							<Menu size={24} />
						)}
					</button>
				</div>

				{/* Menu mobile déroulant */}
				{isMobileMenuOpen && (
					<div className="md:hidden absolute left-0 right-0 top-full mt-2 mx-4 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 backdrop-blur-lg animate-in slide-in-from-top-5 duration-200">
						<div className="flex flex-col space-y-4">
							<MobileNavLink href="/">Accueil</MobileNavLink>
							<MobileNavLink href="/courses">Cours</MobileNavLink>
							<MobileNavLink href="/about">
								À propos
							</MobileNavLink>
							<hr className="border-gray-200" />
							{session ? (
								<>
									<div className="px-4 py-2 flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20">
											{session.user.image ? (
												<Image
													src={session.user.image}
													alt={session.user.name}
													width={40}
													height={40}
												/>
											) : (
												<span>
													{session.user.name.charAt(
														0,
													)}
												</span>
											)}
										</div>
										<div>
											<p className="text-sm font-bold">
												{session.user.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{session.user.email}
											</p>
										</div>
									</div>
									<MobileNavLink href="/student">
										Mes cours
									</MobileNavLink>
									<MobileNavLink href="/profile">
										Mon Profil
									</MobileNavLink>
									<button
										onClick={handleSignOut}
										className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
									>
										<LogOut size={16} />
										Déconnexion
									</button>
								</>
							) : (
								<>
									<Link
										href="/login"
										className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors px-4 py-2 text-center"
									>
										Connexion
									</Link>
									<Link
										href="/register"
										className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
									>
										S&#39;inscrire
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
