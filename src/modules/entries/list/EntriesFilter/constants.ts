import { EntryFilter } from "./types";

export const DEFAULT_ENTRY_FILTER: EntryFilter = {
  orderBy: [
    {
      column: "createdAt",
      direction: "desc",
    },
  ],
  // TODO: handle filtering
  // tags: [],
  // savedOnly: false,
} as const;

export const ENTRIES_PAGE_LIMIT = 20;
