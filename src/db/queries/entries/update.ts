import { eq } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

import { dbGetEntryById } from "./get";

type dbUpdateEntryProps = Pick<Entry, "id"> &
  Partial<Pick<Entry, "title" | "description" | "status" | "notebookId">>;

export const dbUpdateEntry = async ({
  id,
  title,
  description,
  status,
  notebookId,
}: dbUpdateEntryProps): Promise<Entry> => {
  const newVals = Object.fromEntries(
    Object.entries({ title, description, status, notebookId }).filter(
      ([, val]) => val !== undefined,
    ),
  ) as Partial<Pick<Entry, "title" | "description" | "status" | "notebookId">>;

  const result = await db
    .update(entries)
    .set(newVals)
    .where(eq(entries.id, id))
    .returning();

  const entry = await dbGetEntryById(result[0].id);

  if (!entry) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return entry;
};
