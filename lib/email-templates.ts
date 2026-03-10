import fs from "fs";
import path from "path";

/**
 * Utility to load and parse email templates from pure HTML files.
 * This completely dissociates HTML from TypeScript logic.
 */

interface TemplateData {
	title: string;
	userName: string;
	ctaText: string;
	ctaUrl: string;
	footerNote: string;
	contentTemplate: string; // The file name of the content template
	placeholders?: Record<string, string>;
}

const loadTemplate = (data: TemplateData) => {
	const templatesDir = path.join(process.cwd(), "lib", "emails");

	// Load the base layout
	const layoutPath = path.join(templatesDir, "layout.html");
	const layout = fs.readFileSync(layoutPath, "utf8");

	// Load the specific content template
	const contentPath = path.join(templatesDir, data.contentTemplate);
	const content = fs.readFileSync(contentPath, "utf8");

	// Replace placeholders in content
	let parsedContent = content.replace(/{{userName}}/g, data.userName);
	for (const [key, value] of Object.entries(data.placeholders ?? {})) {
		parsedContent = parsedContent.replace(
			new RegExp(`{{${key}}}`, "g"),
			value,
		);
	}

	// Replace placeholders in layout
	const year = new Date().getFullYear().toString();
	const finalHtml = layout
		.replace(/{{title}}/g, data.title)
		.replace(/{{content}}/g, parsedContent)
		.replace(/{{ctaText}}/g, data.ctaText)
		.replace(/{{ctaUrl}}/g, data.ctaUrl)
		.replace(/{{footerNote}}/g, data.footerNote)
		.replace(/{{year}}/g, year);

	return finalHtml;
};

/**
 * Template for Email Verification
 */
export const getVerificationEmailTemplate = ({
	userName,
	verifyPageUrl,
	otpCode,
	expiresMinutes,
}: {
	userName: string;
	verifyPageUrl: string;
	otpCode: string;
	expiresMinutes: number;
}) => {
	return loadTemplate({
		title: "Bienvenue parmi nous !",
		userName,
		ctaText: "Saisir mon code",
		ctaUrl: verifyPageUrl,
		footerNote:
			"Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.",
		contentTemplate: "verification.html",
		placeholders: {
			otpCode,
			expiresMinutes: String(expiresMinutes),
		},
	});
};

/**
 * Template for Password Reset
 */
export const getResetPasswordEmailTemplate = (
	userName: string,
	url: string,
) => {
	return loadTemplate({
		title: "Réinitialisation de mot de passe",
		userName,
		ctaText: "Réinitialiser mon mot de passe",
		ctaUrl: url,
		footerNote:
			"Si vous n'avez pas demandé ce changement, vous pouvez ignorer cet email en toute sécurité.",
		contentTemplate: "reset-password.html",
	});
};
