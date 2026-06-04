import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type DbUpdateNotebooksProps = {
  ids: Notebook["id"][];
  ownerId: Notebook["ownerId"];
} & Partial<Pick<Notebook, "name" | "status">>;

export const dbUpdateNotebooks = async ({
  ids,
  ownerId,
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
    .where(and(inArray(notebooks.id, ids), eq(notebooks.ownerId, ownerId)))
    .returning();

  return result.map((notebook) => ({
    ...notebook,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString(),
  }));
};
