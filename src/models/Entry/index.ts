import { EntryStatus } from "./types";
import { Tag } from "../Tag";

export type Entry = {
  id: number;
  title: string;
  description: string;
  references: [];
  tags: Tag[];
  status: EntryStatus;
  createdAt: Date;
  updatedAt: Date;
};
