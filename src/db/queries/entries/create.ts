import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

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

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),

    // TODO: figure out best way to pass tags here
    tags: [],
  };
};
