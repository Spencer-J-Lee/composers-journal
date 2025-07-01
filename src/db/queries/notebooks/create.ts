import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";

type dbCreateNotebookProps = Pick<Notebook, "ownerId" | "name" | "status">;

export const dbCreateNotebook = async ({
  ownerId,
  name,
  status,
}: dbCreateNotebookProps): Promise<Notebook> => {
  const now = new Date();

  const result = await db
    .insert(notebooks)
    .values({
      ownerId,
      name,
      status,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  if (!result.length) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
};
