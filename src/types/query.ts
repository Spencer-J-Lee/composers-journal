export type OrderBy<T> = {
  column: keyof T;
  direction: "desc" | "asc";
}[];
