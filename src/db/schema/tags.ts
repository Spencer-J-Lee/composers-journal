import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: bigserial({ mode: "number" }).primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  name: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
