import { eq } from "drizzle-orm";

import { db } from "@/db";
import { collections } from "@/db/schema";
import { Collection } from "@/models/Collection";
import { Status } from "@/models/types";

export const dbGetCollections = async (
  userId: string,
): Promise<Collection[]> => {
  // TODO: add limits and order by desc collections.name
  const result = await db
    .select()
    .from(collections)
    .where(eq(collections.ownerId, userId));

  return result.map((collection) => ({
    ...collection,
    status: collection.status as Status,
  }));
};
