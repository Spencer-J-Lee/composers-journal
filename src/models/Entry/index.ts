import { Tag } from "../Tag";
import { Status } from "../types";

// TODO: infer this type from db schema
export type Entry = {
  id: number;
  ownerId: string;
  title: string;
  description: string;
  references: [];
  tags: Tag[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
