import { relations } from "drizzle-orm";
import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { statusEnum } from "@/models/types/status";

import { entries } from "./entries";

export const notebooks = pgTable("notebooks", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  name: text().unique().notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const notebooksRelations = relations(notebooks, ({ many }) => ({
  entries: many(entries),
}));
