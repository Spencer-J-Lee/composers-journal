import { QueryKey } from "@tanstack/react-query";

import { EntryFilter } from "@/modules/entries/list/EntriesFilter/types";

const KEYS = {
  NOTEBOOKS: "notebooks",
  ENTRIES: "entries",
  ACTIVE: "active",
  TRASHED: "trashed",
} as const;

/**
 * Query keys for TanStack Query cache
 */
export const STATIC_TS_KEYS: Record<string, QueryKey> = {
  ACTIVE_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.ACTIVE],
  TRASHED_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.TRASHED],

  TRASHED_ENTRIES: [KEYS.ENTRIES, KEYS.TRASHED],
} as const;
