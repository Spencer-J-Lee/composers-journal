import { db } from "@/db";
import { entries } from "@/db/schema";
import { Status } from "@/models/types";

type dbCreateEntryProps = {
  ownerId: string;
  title: string;
  description: string;
  status: Status;
};

// TODO: type this
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
