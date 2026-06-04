import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { savedItems } from "@/db/schema";
import { SavedItem } from "@/models/SavedItem";

type DbDeleteSavedItemProps = {
  entryId: SavedItem["entryId"];
  ownerId: SavedItem["ownerId"];
};

export const dbDeleteSavedItem = async ({
  entryId,
  ownerId,
}: DbDeleteSavedItemProps) => {
  const result = await db
    .delete(savedItems)
    .where(
      and(eq(savedItems.entryId, entryId), eq(savedItems.ownerId, ownerId)),
    )
    .returning();

  return result.length === 1 ? result[0] : null;
};
