import { asc, desc, SQL } from "drizzle-orm";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

import { OrderBy } from "@/types/query";

// Omit "enableRLS" so tables defined with .enableRLS() (which returns
// Omit<PgTableWithColumns, "enableRLS">) are accepted too.
export const convertOrderByToSql = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Omit<PgTableWithColumns<any>, "enableRLS">,
>(
  table: T,
  orderBy: OrderBy<T> | undefined,
): SQL[] => {
  if (!orderBy) return [];

  return orderBy.map(({ column, direction }) => {
    const col = table[column];
    return direction === "desc" ? desc(col) : asc(col);
  });
};
