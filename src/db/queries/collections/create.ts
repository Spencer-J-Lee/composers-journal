import { db } from "@/db";
import { collections } from "@/db/schema";
import { Status } from "@/models/types";

type dbCreateCollectionProps = {
  ownerId: string;
  name: string;
  status: Status;
};

export const dbCreateCollection = async ({
  ownerId,
  name,
  status,
}: dbCreateCollectionProps) => {
  const now = new Date();

  const data = await db
    .insert(collections)
    .values([
      {
        ownerId,
        name,
        status,
        createdAt: now,
        updatedAt: now,
      },
    ])
    .returning();

  return data;
};
