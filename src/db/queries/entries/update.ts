import { eq } from "drizzle-orm";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

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

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),

    // TODO: figure out best way to pass tags here
    tags: [],
  };
};
