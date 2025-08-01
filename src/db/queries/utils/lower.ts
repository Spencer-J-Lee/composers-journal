import { SQL,sql } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";

export const lower = (col: AnyPgColumn): SQL => {
  return sql`lower(${col})`;
};
