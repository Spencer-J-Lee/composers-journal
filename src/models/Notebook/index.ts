import { Status } from "../types";

export type Notebook = {
  id: number;
  ownerId: string;
  name: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
