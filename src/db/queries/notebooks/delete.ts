import { inArray } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type DbDeleteNotebooksProps = {
  ids: Notebook["id"][];
};

export const dbDeleteNotebooks = async ({ ids }: DbDeleteNotebooksProps) => {
  await db.delete(notebooks).where(inArray(notebooks.id, ids));
};
