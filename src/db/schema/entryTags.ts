import { relations } from "drizzle-orm";
import {
  bigint,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { entries } from "./entries";
import { tags } from "./tags";

export const entryTags = pgTable(
  "entry_tags",
  {
    id: bigint({ mode: "number" })
      .primaryKey()
      // Sequence name predates Drizzle; matches what exists in the database.
      .generatedByDefaultAsIdentity({ name: "entry_tags_id_seq1" }),
    entryId: bigint("entry_id", { mode: "number" })
      .notNull()
      .references(() => entries.id, { onDelete: "cascade" }),
    tagId: bigint("tag_id", { mode: "number" })
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // A tag can only be applied to an entry once.
    uniqueIndex("idx_entry_tags_entry_tag").on(table.entryId, table.tagId),
    index("idx_entry_tags_tag_id").on(table.tagId),
  ],
  // RLS with no policies: the Supabase REST API gets no access. All data
  // access goes through the server-side Drizzle client (postgres role).
).enableRLS();

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
