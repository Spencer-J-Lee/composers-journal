const KEYS = {
  NOTEBOOKS: "notebooks",
  ACTIVE: "active",
  TRASHED: "trashed",
} as const;

/**
 * Query keys for TanStack Query cache
 */
export const TS_KEYS: Record<string, string[]> = {
  ACTIVE_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.ACTIVE],
  TRASHED_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.TRASHED],
} as const;
