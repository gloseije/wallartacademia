"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	active?: boolean;
}

export function NavLink({
	href,
	children,
	active: customActive,
}: NavLinkProps) {
	const pathname = usePathname();
	const active = customActive ?? pathname === href;

	return (
		<Link
			href={href}
			className={`relative text-sm font-medium transition-colors group ${
				active ? "text-primary" : "text-gray-700 hover:text-primary"
			}`}
		>
			{children}
			<span
				className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${
					active ? "w-full" : ""
				}`}
			/>
		</Link>
	);
}
