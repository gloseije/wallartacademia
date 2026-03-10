import prisma from "../lib/prisma";

async function main() {
	console.log("🌱 Début du seed des rôles...");

	const roles = [{ name: "Administrateur" }, { name: "Instructeur" }];

	for (const role of roles) {
		const upsertedRole = await prisma.role.upsert({
			where: { id: roles.indexOf(role) + 1 }, // On utilise l'ID pour l'upsert si possible, ou on peut chercher par nom
			update: {},
			create: {
				name: role.name,
			},
		});
		console.log(`✅ Rôle vérifié/créé : ${upsertedRole.name}`);
	}

	console.log("🏁 Seed terminé avec succès.");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
