import { eq } from "drizzle-orm";

import { db, entries, entryTags, tags } from "@/db";
import { Entry } from "@/models/Entry";

export async function getEntriesByUserId(userId: string) {
  const result = await db
    .select({
      entry: entries,
      tag: tags,
    })
    .from(entries)
    .leftJoin(entryTags, eq(entryTags.entryId, entries.id))
    .leftJoin(tags, eq(tags.id, entryTags.tagId))
    .where(eq(entries.ownerId, userId));

  const groupedEntries = result.reduce(
    (acc, { entry, tag }) => {
      const entryId = entry.id;

      if (!acc[entryId]) {
        acc[entryId] = {
          ...entry,
          tags: [],
          references: [],
        };
      }

      if (tag) {
        acc[entryId].tags.push(tag);
      }

      return acc;
    },
    {} as Record<number, Entry>,
  );

  return Object.values(groupedEntries);
}
