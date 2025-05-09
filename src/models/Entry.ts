import { Tag } from "./Tag";

export const ENTRY_STATUSES = [
  "active",
  "archived",
  "trashed",
  "deleted",
] as const;
export type EntryStatus = (typeof ENTRY_STATUSES)[number];

export interface Entry {
  id: number;
  title: string;
  description: string;
  references: [];
  tags: Tag[];
  status: EntryStatus | null;
  createdAt: Date;
}
