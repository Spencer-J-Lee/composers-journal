import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { entryTags } from "@/db/schema";
import { EntryTag } from "@/models/EntryTag";

type dbDeleteEntryTagsProps = {
  entryId?: EntryTag["entryId"];
  ids?: EntryTag["tagId"][];
};

export const dbDeleteEntryTags = async ({
  entryId,
  ids,
}: dbDeleteEntryTagsProps) => {
  const andClauses = [];
  if (entryId) andClauses.push(eq(entryTags.entryId, entryId));
  if (ids) andClauses.push(inArray(entryTags.tagId, ids));

  await db.delete(entryTags).where(and(...andClauses));
};
