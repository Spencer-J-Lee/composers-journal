import { db } from "@/db";
import { entries } from "@/db/schema";
import { EntryStatus } from "@/models/Entry/types";

type dbCreateEntryProps = {
  ownerId: string;
  title: string;
  description: string;
  status: EntryStatus;
};

export const dbCreateEntry = async ({
  ownerId,
  title,
  description,
  status,
}: dbCreateEntryProps) => {
  const now = new Date();

  const data = await db
    .insert(entries)
    .values([
      {
        ownerId,
        title,
        description,
        status,
        createdAt: now,
        updatedAt: now,
      },
    ])
    .returning();

  return data;
};
