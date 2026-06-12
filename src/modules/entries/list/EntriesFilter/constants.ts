import { entries } from "@/db/schema";
import { OrderBy } from "@/types/query";

import { EntryFilter } from "./types";

export const DEFAULT_ENTRY_FILTER: EntryFilter = {
  orderBy: [
    {
      column: "createdAt",
      direction: "desc",
    },
  ],
  tags: [],
  savedOnly: false,
};

export const ENTRIES_PAGE_LIMIT = 20;

export type SortOption = {
  label: string;
  value: OrderBy<typeof entries>;
};

export const SORT_OPTIONS: SortOption[] = [
  {
    label: "Newest first",
    value: [{ column: "createdAt", direction: "desc" }],
  },
  { label: "Oldest first", value: [{ column: "createdAt", direction: "asc" }] },
  {
    label: "Recently updated",
    value: [{ column: "updatedAt", direction: "desc" }],
  },
  { label: "Title A–Z", value: [{ column: "title", direction: "asc" }] },
  { label: "Title Z–A", value: [{ column: "title", direction: "desc" }] },
];
