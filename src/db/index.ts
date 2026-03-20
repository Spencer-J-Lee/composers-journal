import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { requireEnv } from "@/utils/requireEnv";
import schema from "./schema";

const DB_USER = requireEnv("DB_USER");
const DB_PASSWORD = requireEnv("DB_PASSWORD");
const DB_HOST = requireEnv("DB_HOST");
const DB_PORT = requireEnv("DB_PORT");
const DB_NAME = requireEnv("DB_NAME");
const connectionString = `postgresql://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle({ client, schema });
