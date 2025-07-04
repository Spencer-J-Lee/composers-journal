import { OrderBy } from "@/types/query";

export type CommonApiOptions<T> = {
  limit?: number;
  offset?: number;
  orderBy?: OrderBy<T>;
};
