import { db } from "@/db";
import { tags } from "@/db/schema";
import { Tag } from "@/models/Tag";

export const dbCreateTags = async (
  params: Pick<Tag, "ownerId" | "name">[],
): Promise<Tag[]> => {
  const now = new Date();

  const result = await db
    .insert(tags)
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
