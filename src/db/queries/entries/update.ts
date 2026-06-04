import { and, eq, inArray } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries, notebooks } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { ForbiddenError } from "@/utils/server/errors";

import { dbGetEntries } from "./get";

type DbUpdateEntriesProps = {
  ids: Entry["id"][];
  ownerId: Entry["ownerId"];
} & Partial<Pick<Entry, "title" | "description" | "status" | "notebookId">>;

export const dbUpdateEntries = async ({
  ids,
  ownerId,
  title,
  description,
  status,
  notebookId,
}: DbUpdateEntriesProps): Promise<Entry[]> => {
  // When moving entries to another notebook, ensure the target notebook
  // belongs to the same user before writing anything.
  if (notebookId !== undefined) {
    const [targetNotebook] = await db
      .select({ id: notebooks.id })
      .from(notebooks)
      .where(and(eq(notebooks.id, notebookId), eq(notebooks.ownerId, ownerId)));

    if (!targetNotebook) {
      throw new ForbiddenError();
    }
  }

  const newVals = Object.fromEntries(
    Object.entries({ title, description, status, notebookId }).filter(
      ([, val]) => val !== undefined,
    ),
  ) as Partial<Pick<Entry, "title" | "description" | "status" | "notebookId">>;

  const result = await db
    .update(entries)
    .set({
      ...newVals,
      updatedAt: new Date(),
    })
    .where(and(inArray(entries.id, ids), eq(entries.ownerId, ownerId)))
    .returning();

  const joinedEntries = await dbGetEntries({
    ownerId,
    ids: result.map((entry) => entry.id),
  });

  if (!joinedEntries) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return joinedEntries;
};
