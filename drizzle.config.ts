import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Prefer a full DATABASE_URL if provided, otherwise build the connection
// string from the same DB_* variables the app uses (see src/db/index.ts).
const connectionString =
  process.env.DATABASE_URL ??
  (process.env.DB_USER &&
  process.env.DB_PASSWORD &&
  process.env.DB_HOST &&
  process.env.DB_PORT &&
  process.env.DB_NAME
    ? `postgresql://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    : undefined);

if (!connectionString) {
  throw new Error("DATABASE_URL or DB_* environment variables are not defined");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
