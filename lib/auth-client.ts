import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// Sur le client, baseURL par défaut à l'origine actuelle si non défini
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
