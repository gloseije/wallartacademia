"use client";

import Link from "next/link";

interface UserDropdownItemProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
}

export function UserDropdownItem({
	href,
	icon,
	label,
	onClick,
}: UserDropdownItemProps) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
		>
			{icon}
			{label}
		</Link>
	);
}
