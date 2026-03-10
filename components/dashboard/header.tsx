"use client";

import React from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface HeaderProps {
	role: "admin" | "instructor" | "student";
}

export function Header({ role }: HeaderProps) {
	const roleTitles = {
		admin: "Administration",
		instructor: "Espace Instructeur",
		student: "Espace Étudiant",
	};

	const { data: session, isPending } = authClient.useSession();

	return (
		<header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shrink-0">
			<div className="flex items-center gap-4 pl-12 lg:pl-0">
				<h2 className="text-lg font-semibold font-heading text-zinc-800 line-clamp-1 mt-2">
					{roleTitles[role]}
				</h2>
			</div>
			<div className="flex items-center gap-2">
				{/* Espace pour des actions globales, notifications, etc. */}
				{isPending ? (
					<div className="h-9 w-9 rounded-full bg-zinc-200 animate-pulse" />
				) : session?.user ? (
					<>
						<div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs overflow-hidden">
							{session.user.image ? (
								<Image
									src={session.user.image}
									alt={session.user.name}
									width={36}
									height={36}
									className="w-full h-full object-cover"
								/>
							) : (
								<span>
									{session.user.name.charAt(0).toUpperCase()}
								</span>
							)}
						</div>
						<p className="text-sm font-bold leading-none">
							{session.user.name}
						</p>
					</>
				) : (
					<div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
						?
					</div>
				)}
			</div>
		</header>
	);
}
