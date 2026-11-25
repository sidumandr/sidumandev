import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/** Veritabanı tanımlı değilse site varsayılan içerikle çalışır, admin paneli kapalı kalır. */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

/** Geliştirme sırasında sıcak yenilemelerde bağlantı havuzunun çoğalmaması için tekil tutulur. */
export function db(): PrismaClient {
  if (!hasDatabase) throw new Error("DATABASE_URL tanımlı değil.");
  globalForPrisma.prisma ??= createClient();
  return globalForPrisma.prisma;
}
