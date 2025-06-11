import { inArray } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type dbDeleteNotebooksProps = {
  ids: Notebook["id"][];
};

export const dbDeleteNotebooks = async ({ ids }: dbDeleteNotebooksProps) => {
  await db.delete(notebooks).where(inArray(notebooks.id, ids));
};
