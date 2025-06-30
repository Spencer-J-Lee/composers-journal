const KEYS = {
  NOTEBOOKS: "notebooks",
  ACTIVE: "active",
} as const;

/**
 * Query keys for TanStack Query cache
 */
export const TS_KEYS: Record<string, string[]> = {
  ACTIVE_NOTEBOOKS: [KEYS.NOTEBOOKS, KEYS.ACTIVE],
} as const;
