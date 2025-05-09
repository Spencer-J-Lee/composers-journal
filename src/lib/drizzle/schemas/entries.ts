import { ENTRY_STATUSES } from "@/models/Entry";
import { pgTable, bigint, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const entryStatusEnum = pgEnum("entry_status", ENTRY_STATUSES);

export const entries = pgTable("entries", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  ownerId: bigint("owner_id", { mode: "number" }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: entryStatusEnum("status"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
