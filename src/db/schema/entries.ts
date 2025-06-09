import {
  bigint,
  bigserial,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { statusEnum } from "@/models/types";

// TODO: set up relations
export const entries = pgTable("entries", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  notebookId: bigint("notebook_id", { mode: "number" }).notNull(),
  title: text().notNull(),
  description: text().notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
