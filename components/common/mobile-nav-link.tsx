"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavLinkProps {
	href: string;
	children: React.ReactNode;
	active?: boolean;
}

export function MobileNavLink({
	href,
	children,
	active: customActive,
}: MobileNavLinkProps) {
	const pathname = usePathname();
	const active = customActive ?? pathname === href;

	return (
		<Link
			href={href}
			className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
				active
					? "bg-primary/10 text-primary"
					: "text-gray-700 hover:bg-gray-100"
			}`}
		>
			{children}
		</Link>
	);
}
