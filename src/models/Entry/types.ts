export const ENTRY_STATUSES = {
  ACTIVE: "active",
  ARCHIVED: "archived",
  TRASHED: "trashed",
  DELETED: "deleted",
} as const;
export const entryStatusValues = Object.values(ENTRY_STATUSES);
export type EntryStatus = (typeof entryStatusValues)[number];
