"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { usePathname } from "next/navigation";
import { EmailVerificationGuard } from "@/components/auth/email-verification-guard";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// Inferrer le rôle depuis l'URL pour la démo
	const getRole = (): "admin" | "instructor" | "student" => {
		if (pathname.startsWith("/admin")) return "admin";
		if (pathname.startsWith("/instructor")) return "instructor";
		return "student";
	};

	const role = getRole();

	return (
		<EmailVerificationGuard>
			<div className="flex min-h-screen bg-[#fcfcfd]">
				<Sidebar role={role} />
				<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
					<Header role={role} />
					<main className="flex-1 overflow-y-auto p-8 lg:p-12">
						<div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
							{children}
						</div>
					</main>
				</div>
			</div>
		</EmailVerificationGuard>
	);
}
