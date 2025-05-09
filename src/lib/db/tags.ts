import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  ownerId: bigint("owner_id", { mode: "number" }).notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
