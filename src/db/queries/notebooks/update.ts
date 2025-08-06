import { inArray } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type DbUpdateNotebooksProps = {
  ids: Notebook["id"][];
} & Partial<Pick<Notebook, "name" | "status">>;

export const dbUpdateNotebooks = async ({
  ids,
  name,
  status,
}: DbUpdateNotebooksProps): Promise<Notebook[]> => {
  const newVals = Object.fromEntries(
    Object.entries({ name, status }).filter(([, val]) => val !== undefined),
  ) as Partial<Pick<Notebook, "name" | "status">>;

  const result = await db
    .update(notebooks)
    .set({
      ...newVals,
      updatedAt: new Date(),
    })
    .where(inArray(notebooks.id, ids))
    .returning();

  return result.map((notebook) => ({
    ...notebook,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString(),
  }));
};
