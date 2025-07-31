import { ReactNode } from "react";

export type SortBy<T> = {
  key: keyof T;
  direction: "desc" | "asc";
  type: "string" | "dateString";
};

export type SortByOption<T> = {
  label: ReactNode;
} & SortBy<T>;
