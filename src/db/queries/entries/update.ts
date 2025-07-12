import { inArray } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

import { dbGetEntries } from "./get";

type dbUpdateEntriesProps = { ids: Entry["id"][] } & Partial<
  Pick<Entry, "title" | "description" | "status" | "notebookId">
>;

export const dbUpdateEntries = async ({
  ids,
  title,
  description,
  status,
  notebookId,
}: dbUpdateEntriesProps): Promise<Entry[]> => {
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
    .where(inArray(entries.id, ids))
    .returning();

  const joinedEntries = await dbGetEntries({
    ids: result.map((entry) => entry.id),
  });

  if (!joinedEntries) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return joinedEntries;
};
