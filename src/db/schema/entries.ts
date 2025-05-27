import {
  bigserial,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { ENTRY_STATUSES } from "@/models/Entry";

export const entryStatusEnum = pgEnum("entry_status", ENTRY_STATUSES);

export const entries = pgTable("entries", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  title: text().notNull(),
  description: text().notNull(),
  status: entryStatusEnum("status"),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});
