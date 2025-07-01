import { pgEnum } from "drizzle-orm/pg-core";

export const STATUSES = {
  ACTIVE: "active",
  ARCHIVED: "archived",
  TRASHED: "trashed",
  DELETED: "deleted",
} as const;
export const statusValues = Object.values(STATUSES);
export type Status = (typeof statusValues)[number];
export const statusEnum = pgEnum("status", STATUSES);

export type WithDateStrings<T> = Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
