import { eq } from "drizzle-orm";

import { db } from "@/db";
import { savedItems } from "@/db/schema";
import { SavedItem } from "@/models/SavedItem";

type dbDeleteSavedItemsProps = {
  entryId: SavedItem["entryId"];
};

export const dbDeleteSavedItems = async ({
  entryId,
}: dbDeleteSavedItemsProps) => {
  await db.delete(savedItems).where(eq(savedItems.entryId, entryId));
};
