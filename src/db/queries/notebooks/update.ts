import { eq } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type dbUpdateNotebookProps = Pick<Notebook, "id"> &
  Partial<Pick<Notebook, "name" | "status">>;

export const dbUpdateNotebook = async ({
  id,
  name,
  status,
}: dbUpdateNotebookProps): Promise<Notebook> => {
  const newVals = Object.fromEntries(
    Object.entries({ name, status }).filter(([, val]) => val !== undefined),
  ) as Partial<Pick<Notebook, "name" | "status">>;

  const result = await db
    .update(notebooks)
    .set({
      ...newVals,
      updatedAt: new Date(),
    })
    .where(eq(notebooks.id, id))
    .returning();

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
};
