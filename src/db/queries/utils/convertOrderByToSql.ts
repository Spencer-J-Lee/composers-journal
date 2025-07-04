import { asc, desc, SQL } from "drizzle-orm";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

import { OrderBy } from "@/types/query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertOrderByToSql = <T extends PgTableWithColumns<any>>(
  table: T,
  orderBy: OrderBy<T> | undefined,
): SQL[] => {
  if (!orderBy) return [];

  return orderBy.map(({ column, direction }) => {
    const col = table[column];
    return direction === "desc" ? desc(col) : asc(col);
  });
};
