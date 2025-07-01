const KEYS = {
  NOTEBOOKS: "notebooks",
  ENTRIES: "entries",
  ACTIVE: "active",
  TRASHED: "trashed",
} as const;

/**
 * Query keys for TanStack Query cache
 */
export const TS_KEYS: Record<string, string[]> = {
  ACTIVE_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.ACTIVE],
  TRASHED_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.TRASHED],

  ACTIVE_ENTRIES: [KEYS.ENTRIES, KEYS.ACTIVE],
  TRASHED_ENTRIES: [KEYS.ENTRIES, KEYS.TRASHED],
} as const;
