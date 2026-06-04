import { relations } from "drizzle-orm";
import {
  bigint,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { statusEnum, STATUSES } from "@/models/types/status";

import { entryTags } from "./entryTags";
import { notebooks } from "./notebooks";
import { savedItems } from "./savedItems";

export const entries = pgTable(
  "entries",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    ownerId: uuid("owner_id").notNull(),
    notebookId: bigint("notebook_id", { mode: "number" })
      .notNull()
      .references(() => notebooks.id, { onDelete: "cascade" }),
    title: text().notNull(),
    description: text().notNull(),
    status: statusEnum("status").default(STATUSES.ACTIVE).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_entries_owner_id").on(table.ownerId),
    index("idx_entries_notebook_id").on(table.notebookId),
  ],
  // RLS with no policies: the Supabase REST API gets no access. All data
  // access goes through the server-side Drizzle client (postgres role).
).enableRLS();

export const entriesRelations = relations(entries, ({ one, many }) => ({
  notebooks: one(notebooks, {
    fields: [entries.notebookId],
    references: [notebooks.id],
  }),
  entryTags: many(entryTags),
  savedItem: one(savedItems, {
    fields: [entries.id],
    references: [savedItems.entryId],
  }),
}));
