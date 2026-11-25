import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Migration'lar bağlantı havuzu (PgBouncer) yerine doğrudan bağlantıyla çalışmalı.
  // Neon bunu DATABASE_URL_UNPOOLED olarak verir; yerelde tanımlı değilse DATABASE_URL kullanılır.
  datasource: { url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL },
});
