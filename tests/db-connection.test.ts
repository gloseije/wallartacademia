import prisma from "../lib/prisma";

async function testConnection() {
	console.log("--- [Test] Connexion à la Base de Données ---");
	try {
		// Tentative explicite de connexion
		await prisma.$connect();
		console.log("✅ Connexion réussie à PostgreSQL !");

		// Vérification simple d'une requête
		const userCount = await prisma.user.count();
		console.log(
			`📊 Nombre d'utilisateurs dans la table 'users' : ${userCount}`,
		);
	} catch (error) {
		console.error("❌ Échec lors de la connexion à la base de données.");
		console.error("Détails de l'erreur :");
		if (error instanceof Error) {
			console.error(`- Nom : ${error.name}`);
			console.error(`- Message : ${error.message}`);
		} else {
			console.error(error);
		}
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

testConnection();
