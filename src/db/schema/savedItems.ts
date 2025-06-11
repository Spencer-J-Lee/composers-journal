import { relations } from "drizzle-orm";
import {
  bigint,
  bigserial,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { entries } from "./entries";

export const savedItems = pgTable("saved_items", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  entryId: bigint("entry_id", { mode: "number" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const savedItemsRelations = relations(savedItems, ({ one }) => ({
  entry: one(entries, {
    fields: [savedItems.entryId],
    references: [entries.id],
  }),
}));
