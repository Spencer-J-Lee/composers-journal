import { Tag } from "../Tag";
import { Status } from "../types";

export type Entry = {
  id: number;
  title: string;
  description: string;
  references: [];
  tags: Tag[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
