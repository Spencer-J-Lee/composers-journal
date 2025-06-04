import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { statusEnum } from "@/models/types";

export const entries = pgTable("entries", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  title: text().notNull(),
  description: text().notNull(),
  status: statusEnum("status"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
