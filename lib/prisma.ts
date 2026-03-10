import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	// Création du pool de connexion PostgreSQL natif
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	// Utilisation de l'adaptateur Prisma pour PG (Requis dans Prisma 7 pour les connexions directes)
	const adapter = new PrismaPg(pool);

	// Initialisation du client avec l'adaptateur
	return new PrismaClient({ adapter });
};

declare global {
	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
