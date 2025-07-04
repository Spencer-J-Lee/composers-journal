import { OrderBy } from "@/types/query";

// TODO: clean up
export type LimitOption = { limit?: number };
export type OffsetOption = { offset?: number };

export type CommonApiOptions<T> = {
  limit?: number;
  offset?: number;
  orderBy?: OrderBy<T>;
};
