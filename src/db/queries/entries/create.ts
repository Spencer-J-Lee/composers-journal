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

  const data = await db
    .insert(entries)
    .values([
      {
        ...props,
        createdAt: now,
        updatedAt: now,
      },
    ])
    .returning();

  if (!data.length) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return {
    ...data[0],
    // TODO: figure out best way to past tags here
    tags: [],
  };
};
