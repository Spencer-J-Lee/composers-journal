import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

import { dbGetEntryById } from "./get";

type dbCreateEntryProps = Pick<
  Entry,
  "ownerId" | "notebookId" | "title" | "description" | "status"
>;

export const dbCreateEntry = async (
  props: dbCreateEntryProps,
): Promise<Entry> => {
  const now = new Date();

  const result = await db
    .insert(entries)
    .values([
      {
        ...props,
        createdAt: now,
        updatedAt: now,
      },
    ])
    .returning();

  if (!result.length) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  const entry = await dbGetEntryById(result[0].id);

  if (!entry) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return entry;
};
