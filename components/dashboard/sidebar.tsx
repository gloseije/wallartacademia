"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	BookOpen,
	Users,
	Settings,
	Layers,
	BarChart3,
	GraduationCap,
	Heart,
	LogOut,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";

const navigation = {
	admin: [
		{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
		{ name: "Utilisateurs", href: "/admin/users", icon: Users },
		{ name: "Catégories", href: "/admin/categories", icon: Layers },
		{ name: "Paramètres", href: "/admin/settings", icon: Settings },
	],
	instructor: [
		{ name: "Dashboard", href: "/instructor", icon: LayoutDashboard },
		{ name: "Mes Cours", href: "/instructor/courses", icon: BookOpen },
		{
			name: "Statistiques",
			href: "/instructor/analytics",
			icon: BarChart3,
		},
	],
	student: [
		{ name: "Tableau de bord", href: "/student", icon: LayoutDashboard },
		{ name: "Mes Cours", href: "/student/my-courses", icon: GraduationCap },
		{ name: "Ma Progression", href: "/student/progress", icon: BarChart3 },
		{ name: "Favoris", href: "/student/favorites", icon: Heart },
	],
};

interface SidebarProps {
	role: "admin" | "instructor" | "student";
}

export function Sidebar({ role }: SidebarProps) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const items = navigation[role];

	return (
		<>
			{/* Mobile Hammer Button */}
			<button
				title="Menu"
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background border rounded-lg shadow-sm"
			>
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</button>

			{/* Backdrop for mobile */}
			{isOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
					onClick={() => setIsOpen(false)}
				/>
			)}

			<aside
				className={`
				fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
				${isOpen ? "translate-x-0" : "-translate-x-full"}
			`}
			>
				<div className="flex flex-col h-full">
					<div className="h-16 flex items-center px-6 border-b">
						<Link href="/" className="flex items-center">
							<Image
								src="/wallartacademia.PNG"
								alt="wallart academia logo"
								width={150}
								height={40}
								className="h-10 w-auto"
							/>
						</Link>
					</div>

					<nav className="flex-1 overflow-y-auto p-4 space-y-1">
						<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
							Menu {role}
						</div>
						{items.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={`
										flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
										${
											isActive
												? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
												: "hover:bg-muted text-muted-foreground hover:text-foreground"
										}
									`}
								>
									<item.icon
										size={20}
										className={
											isActive
												? "text-primary-foreground"
												: "text-muted-foreground group-hover:text-primary transition-colors"
										}
									/>
									<span className="font-medium">
										{item.name}
									</span>
								</Link>
							);
						})}
					</nav>

					<div className="p-4 border-t space-y-1">
						<Link
							href="/profile"
							className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
						>
							<Settings size={20} />
							<span className="font-medium">Profil</span>
						</Link>
						<button
							className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-medium"
							onClick={() => {
								/* Logout logic */
							}}
						>
							<LogOut size={20} />
							<span>Déconnexion</span>
						</button>
					</div>
				</div>
			</aside>
		</>
	);
}
