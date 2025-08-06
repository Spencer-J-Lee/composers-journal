import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { savedItems } from "@/db/schema";
import { SavedItem } from "@/models/SavedItem";

type DbCreateSavedItemProps = Pick<SavedItem, "ownerId" | "entryId">;

export const dbCreateSavedItem = async ({
  ownerId,
  entryId,
}: DbCreateSavedItemProps): Promise<SavedItem> => {
  const now = new Date();

  const result = await db
    .insert(savedItems)
    .values({
      ownerId,
      entryId,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  if (!result.length) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return {
    ...result[0],
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
};
