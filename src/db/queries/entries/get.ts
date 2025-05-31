import { eq } from "drizzle-orm";

import { db } from "@/db";
import { entries, entryTags, tags } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { EntryStatus } from "@/models/Entry/types";

export const dbGetEntries = async (userId: string) => {
  // TODO: add limits and order by desc entries.createdAt
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
          status: entry.status as EntryStatus,
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
};
