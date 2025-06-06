import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Status } from "@/models/types";

type dbCreateNotebookProps = {
  ownerId: string;
  name: string;
  status: Status;
};

export const dbCreateNotebook = async ({
  ownerId,
  name,
  status,
}: dbCreateNotebookProps) => {
  const now = new Date();

  const data = await db
    .insert(notebooks)
    .values([
      {
        ownerId,
        name,
        status,
        createdAt: now,
        updatedAt: now,
      },
    ])
    .returning();

  return data;
};
