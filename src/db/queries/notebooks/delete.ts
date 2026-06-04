import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type DbDeleteNotebooksProps = {
  ids: Notebook["id"][];
  ownerId: Notebook["ownerId"];
};

export const dbDeleteNotebooks = async ({
  ids,
  ownerId,
}: DbDeleteNotebooksProps) => {
  await db
    .delete(notebooks)
    .where(and(inArray(notebooks.id, ids), eq(notebooks.ownerId, ownerId)));
};
