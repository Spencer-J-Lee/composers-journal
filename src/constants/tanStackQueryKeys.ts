import { QueryKey } from "@tanstack/react-query";

import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";

const KEYS = {
  NOTEBOOKS: "notebooks",
  ENTRIES: "entries",
  TAGS: "tags",
  ACTIVE: "active",
  TRASHED: "trashed",
  METRICS: "metrics",
  RECENTLY_UPDATED: "recentlyUpdated",
} as const;

/**
 * Query keys for TanStack Query cache
 */
export const STATIC_TS_KEYS: Record<string, QueryKey> = {
  ACTIVE_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.ACTIVE],
  TRASHED_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.TRASHED],
  NOTEBOOK_METRICS: [KEYS.NOTEBOOKS, KEYS.METRICS],

  TRASHED_ENTRIES: [KEYS.ENTRIES, KEYS.TRASHED],
  RECENTLY_UPDATED_ENTRIES: [KEYS.ENTRIES, KEYS.RECENTLY_UPDATED],

  TAGS: [KEYS.TAGS],
} as const;

/**
 * Query keys for TanStack Query cache
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DYNAMIC_TS_KEYS: Record<string, (...args: any[]) => QueryKey> = {
  ENTRIES_BY_FILTERS: (notebookId: number, filters: EntryFilter) => [
    KEYS.ENTRIES,
    notebookId,
    filters,
  ],
} as const;
