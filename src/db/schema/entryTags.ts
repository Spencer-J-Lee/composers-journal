import { relations } from "drizzle-orm";
import { bigint, bigserial, pgTable, timestamp } from "drizzle-orm/pg-core";

import { entries } from "./entries";
import { tags } from "./tags";

// TODO: set up relations
export const entryTags = pgTable("entry_tags", {
  id: bigserial({ mode: "number" }).primaryKey(),
  entryId: bigint("entry_id", { mode: "number" }).notNull(),
  tagId: bigint("tag_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const entryTagsRelations = relations(entryTags, ({ one }) => ({
  entries: one(entries, {
    fields: [entryTags.entryId],
    references: [entries.id],
  }),
  tags: one(tags, {
    fields: [entryTags.tagId],
    references: [tags.id],
  }),
}));
