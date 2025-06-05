import { Status } from "../types";

export type Collection = {
  id: number;
  ownerId: string;
  name: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
