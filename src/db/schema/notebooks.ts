import { relations } from "drizzle-orm";
import {
  bigint,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { statusEnum } from "@/models/types/status";

import { entries } from "./entries";

export const notebooks = pgTable(
  "notebooks",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    ownerId: uuid("owner_id").notNull(),
    name: text().notNull(),
    status: statusEnum("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Notebook names are unique per user, not globally.
    uniqueIndex("idx_notebooks_owner_name").on(table.ownerId, table.name),
  ],
  // RLS with no policies: the Supabase REST API gets no access. All data
  // access goes through the server-side Drizzle client (postgres role).
).enableRLS();

export const notebooksRelations = relations(notebooks, ({ many }) => ({
  entries: many(entries),
}));
