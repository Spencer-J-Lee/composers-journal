import { and, eq, inArray } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries, entryTags } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { EntryTag } from "@/models/EntryTag";

type DbDeleteEntryTagsProps = {
  ownerId: Entry["ownerId"];
  entryId?: EntryTag["entryId"];
  ids?: EntryTag["tagId"][];
};

export const dbDeleteEntryTags = async ({
  ownerId,
  entryId,
  ids,
}: DbDeleteEntryTagsProps) => {
  // Without this guard an empty filter set would produce an unscoped
  // delete and wipe the whole table.
  if (entryId === undefined && !ids?.length) {
    throw new Error(ERROR_MESSAGES.DEV.DELETE.ENTRY_TAGS_NO_FILTER);
  }

  // Only delete relations whose entry belongs to the user.
  const ownedEntryIds = db
    .select({ id: entries.id })
    .from(entries)
    .where(eq(entries.ownerId, ownerId));

  const andClauses = [inArray(entryTags.entryId, ownedEntryIds)];
  if (entryId) andClauses.push(eq(entryTags.entryId, entryId));
  if (ids) andClauses.push(inArray(entryTags.tagId, ids));

  await db.delete(entryTags).where(and(...andClauses));
};
