import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { entries } from "../drizzle/schemas/entries";
import { entryTags } from "../drizzle/schemas/entryTags";
import { tags } from "../drizzle/schemas/tags";
import { Entry } from "@/models/Entry";

export async function getEntriesByUserId(userId: number) {
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
