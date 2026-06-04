import { relations } from "drizzle-orm";
import {
  bigint,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { entryTags } from "./entryTags";

export const tags = pgTable(
  "tags",
  {
    id: bigint({ mode: "number" })
      .primaryKey()
      // Sequence name predates Drizzle; matches what exists in the database
      // (the tags table was originally created from a copy of entry_tags).
      .generatedByDefaultAsIdentity({ name: "entry_tags_id_seq" }),
    ownerId: uuid("owner_id").notNull(),
    name: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Tag names are unique per user.
    uniqueIndex("idx_tags_owner_name").on(table.ownerId, table.name),
  ],
  // RLS with no policies: the Supabase REST API gets no access. All data
  // access goes through the server-side Drizzle client (postgres role).
).enableRLS();

export const tagsRelations = relations(tags, ({ many }) => ({
  entryTags: many(entryTags),
}));
