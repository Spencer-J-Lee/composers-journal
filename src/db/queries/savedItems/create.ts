import { and, eq } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries, savedItems } from "@/db/schema";
import { SavedItem } from "@/models/SavedItem";
import { ForbiddenError } from "@/utils/server/errors";

type DbCreateSavedItemProps = Pick<SavedItem, "ownerId" | "entryId">;

export const dbCreateSavedItem = async ({
  ownerId,
  entryId,
}: DbCreateSavedItemProps): Promise<SavedItem> => {
  // Only allow saving entries that belong to the user.
  const [entry] = await db
    .select({ id: entries.id })
    .from(entries)
    .where(and(eq(entries.id, entryId), eq(entries.ownerId, ownerId)));

  if (!entry) {
    throw new ForbiddenError();
  }

  const now = new Date();

  const result = await db
    .insert(savedItems)
    .values({
      ownerId,
      entryId,
      createdAt: now,
      updatedAt: now,
    })
    // Idempotent: saving an already-saved entry returns the existing row.
    .onConflictDoNothing()
    .returning();

  const savedItem =
    result[0] ??
    (await db.query.savedItems.findFirst({
      where: and(
        eq(savedItems.ownerId, ownerId),
        eq(savedItems.entryId, entryId),
      ),
    }));

  if (!savedItem) {
    throw new Error(ERROR_MESSAGES.DEV.DB_RETURNED_EMPTY);
  }

  return {
    ...savedItem,
    createdAt: savedItem.createdAt.toISOString(),
    updatedAt: savedItem.updatedAt.toISOString(),
  };
};
