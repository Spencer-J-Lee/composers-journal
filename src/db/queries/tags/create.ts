import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { tags } from "@/db/schema";
import { Tag } from "@/models/Tag";

type DbCreateTagsProps = {
  ownerId: Tag["ownerId"];
  names: Tag["name"][];
};

/**
 * Creates the given tags for the user. Idempotent: names that already
 * exist for the user are skipped, and the returned list always contains
 * every requested tag (existing or newly created) with its id.
 */
export const dbCreateTags = async ({
  ownerId,
  names,
}: DbCreateTagsProps): Promise<Tag[]> => {
  if (!names.length) {
    return [];
  }

  const now = new Date();

  await db
    .insert(tags)
    .values(
      names.map((name) => ({
        ownerId,
        name,
        createdAt: now,
        updatedAt: now,
      })),
    )
    .onConflictDoNothing();

  const result = await db.query.tags.findMany({
    where: and(eq(tags.ownerId, ownerId), inArray(tags.name, names)),
  });

  const formattedData = result.map(({ createdAt, updatedAt, ...props }) => {
    return {
      ...props,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  });

  return formattedData;
};
