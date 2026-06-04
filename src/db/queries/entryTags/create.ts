import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { entries, entryTags, tags } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { EntryTag } from "@/models/EntryTag";
import { ForbiddenError } from "@/utils/server/errors";

type DbCreateEntryTagsProps = {
  ownerId: Entry["ownerId"];
  entryTags: Pick<EntryTag, "entryId" | "tagId">[];
};

export const dbCreateEntryTags = async ({
  ownerId,
  entryTags: params,
}: DbCreateEntryTagsProps): Promise<EntryTag[]> => {
  if (!params.length) {
    return [];
  }

  // Ensure every referenced entry and tag belongs to the user before linking.
  const entryIds = [...new Set(params.map(({ entryId }) => entryId))];
  const tagIds = [...new Set(params.map(({ tagId }) => tagId))];

  const [ownedEntries, ownedTags] = await Promise.all([
    db
      .select({ id: entries.id })
      .from(entries)
      .where(and(inArray(entries.id, entryIds), eq(entries.ownerId, ownerId))),
    db
      .select({ id: tags.id })
      .from(tags)
      .where(and(inArray(tags.id, tagIds), eq(tags.ownerId, ownerId))),
  ]);

  if (ownedEntries.length !== entryIds.length || ownedTags.length !== tagIds.length) {
    throw new ForbiddenError();
  }

  const now = new Date();

  const result = await db
    .insert(entryTags)
    .values(
      params.map((props) => ({
        ...props,
        createdAt: now,
        updatedAt: now,
      })),
    )
    // Idempotent: a tag already applied to an entry is skipped.
    .onConflictDoNothing()
    .returning();

  const formattedData = result.map(({ createdAt, updatedAt, ...props }) => {
    return {
      ...props,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  });

  return formattedData;
};
