import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

type dbGetEntriesProps = { limit?: number } & Pick<Entry, "ownerId">;

export const dbGetEntries = async ({
  ownerId,
  limit = 50,
}: dbGetEntriesProps): Promise<Entry[]> => {
  const result = await db.query.entries.findMany({
    where: eq(entries.ownerId, ownerId),
    with: {
      entryTags: {
        with: {
          tags: true,
        },
      },
    },
    orderBy: [desc(entries.createdAt)],
    limit,
  });

  const formattedData = result.map(({ entryTags, ...rest }) => {
    return {
      ...rest,
      tags: entryTags.map((entryTag) => entryTag.tags),
    };
  });

  return formattedData;
};
