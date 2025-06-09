import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { statusEnum } from "@/models/types";

// TODO: set up relations
export const notebooks = pgTable("notebooks", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  name: text().unique().notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
