"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface EmailVerificationGuardProps {
	children: ReactNode;
}

export function EmailVerificationGuard({
	children,
}: EmailVerificationGuardProps) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (isPending) return;

		if (!session) {
			router.replace("/login");
			return;
		}

		if (!session.user.emailVerified) {
			const email = session.user.email ?? "";
			const query = email
				? `?email=${encodeURIComponent(email)}`
				: "";
			router.replace(`/verify-email${query}`);
		}
	}, [isPending, session, router]);

	return <>{children}</>;
}

