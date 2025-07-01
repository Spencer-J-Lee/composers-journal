const KEYS = {
  NOTEBOOKS: "notebooks",
  ENTRIES: "entries",
  ACTIVE: "active",
  TRASHED: "trashed",
  EDITING: "editing",
} as const;

/**
 * Query keys for TanStack Query cache
 */
export const TS_KEYS: Record<string, string[]> = {
  ACTIVE_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.ACTIVE],
  TRASHED_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.TRASHED],
  NOTEBOOK_BEING_EDITED: [KEYS.NOTEBOOKS, KEYS.EDITING],

  ACTIVE_ENTRIES: [KEYS.ENTRIES, KEYS.ACTIVE],
  TRASHED_ENTRIES: [KEYS.ENTRIES, KEYS.TRASHED],
} as const;
