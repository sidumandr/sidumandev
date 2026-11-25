// Vercel derlemesinde bekleyen veritabanı migration'larını uygular.
// DATABASE_URL yoksa (ör. yerel `npm run build` ya da veritabanı henüz eklenmemişse) atlar.
import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL tanımlı değil, migration adımı atlandı.");
} else {
  execSync("prisma migrate deploy", { stdio: "inherit" });
}
