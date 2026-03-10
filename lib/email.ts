import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
	port: Number(process.env.SMTP_PORT) || 2525,
	auth: {
		user: process.env.SMTP_USER || "c2b047bf1b2f4c",
		pass: process.env.SMTP_PASSWORD || "********",
	},
});

export const sendEmail = async ({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) => {
	try {
		console.log(`Envoi d'email à ${to}... (Sujet: ${subject})`);
		const info = await transporter.sendMail({
			from:
				process.env.SMTP_FROM ||
				'"Wallart Academia" <noreply@wallartacademia.com>',
			to,
			subject,
			html,
		});
		console.log("Email envoyé: %s", info.messageId);
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email:", error);
	}
};
