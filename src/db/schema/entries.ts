import { relations } from "drizzle-orm";
import {
  bigint,
  bigserial,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { statusEnum } from "@/models/types/status";

import { entryTags } from "./entryTags";
import { notebooks } from "./notebooks";
import { savedItems } from "./savedItems";

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
