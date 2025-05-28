import { Tag } from "../Tag";
import { EntryStatus } from "./types";

export type Entry = {
  id: number;
  title: string;
  description: string;
  references: [];
  tags: Tag[];
  status: EntryStatus | null;
  createdAt: Date;
};
