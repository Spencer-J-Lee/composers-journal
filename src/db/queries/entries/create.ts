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

  return data[0];
};
