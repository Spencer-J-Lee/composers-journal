import { eq } from "drizzle-orm";

import { db } from "@/db";
import { savedItems } from "@/db/schema";
import { SavedItem } from "@/models/SavedItem";

type dbDeleteSavedItemProps = {
  entryId: SavedItem["entryId"];
};

export const dbDeleteSavedItem = async ({
  entryId,
}: dbDeleteSavedItemProps) => {
  const result = await db
    .delete(savedItems)
    .where(eq(savedItems.entryId, entryId))
    .returning();

  return result.length === 1 ? result[0] : null;
};
