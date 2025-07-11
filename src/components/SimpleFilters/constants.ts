import { SortBy } from "./types";

export const SORT_OPTIONS: {
  label: string;
  value: SortBy;
}[] = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
] as const;
