import "dotenv/config";
import { sendEmail } from "../lib/email";

async function testEmail() {
	console.log("--- [Test] Envoi d'Email ---");

	const testDest = process.env.EMAIL_TEST || "test@wallartacademia.com";

	try {
		await sendEmail({
			to: testDest,
			subject: "🔍 Test de Configuration - wallart academia",
			html: `
				<div style="font-family: Arial, sans-serif; color: #333;">
					<h1>Configuration Email Réussie !</h1>
					<p>Si vous voyez ceci dans votre boîte de réception Mailtrap, c'est que l'intégration est opérationnelle.</p>
					<hr />
					<p><small>Envoyé le : ${new Date().toLocaleString()}</small></p>
				</div>
			`,
		});
		console.log(`✅ Email de test envoyé avec succès à ${testDest}.`);
	} catch (error) {
		console.error("❌ Échec de l'envoi de l'email de test.");
		console.error("Détails de l'erreur :");
		console.error(error);
		process.exit(1);
	}
}

testEmail();
