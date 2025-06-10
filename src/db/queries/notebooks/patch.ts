import { eq } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
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
    .set(newVals)
    .where(eq(notebooks.id, id))
    .returning();

  if (!result.length) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return result[0];
};
