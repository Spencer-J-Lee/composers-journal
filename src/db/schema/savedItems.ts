import { relations } from "drizzle-orm";
import {
  bigint,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { entries } from "./entries";

export const savedItems = pgTable(
  "saved_items",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    ownerId: uuid("owner_id").notNull(),
    entryId: bigint("entry_id", { mode: "number" })
      .notNull()
      .references(() => entries.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // A user can only save an entry once.
    uniqueIndex("idx_saved_items_owner_entry").on(table.ownerId, table.entryId),
    index("idx_saved_items_entry_id").on(table.entryId),
  ],
  // RLS with no policies: the Supabase REST API gets no access. All data
  // access goes through the server-side Drizzle client (postgres role).
).enableRLS();

export const savedItemsRelations = relations(savedItems, ({ one }) => ({
  entry: one(entries, {
    fields: [savedItems.entryId],
    references: [entries.id],
  }),
}));
