import { bigint, bigserial, pgTable, timestamp } from "drizzle-orm/pg-core";

// TODO: set up relations
export const entryTags = pgTable("entry_tags", {
  id: bigserial({ mode: "number" }).primaryKey(),
  entryId: bigint("entry_id", { mode: "number" }).notNull(),
  tagId: bigint("tag_id", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
