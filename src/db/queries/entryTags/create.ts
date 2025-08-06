import { db } from "@/db";
import { entryTags } from "@/db/schema";
import { EntryTag } from "@/models/EntryTag";

export const dbCreateEntryTags = async (
  params: Pick<EntryTag, "entryId" | "tagId">[],
): Promise<EntryTag[]> => {
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
