import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { LimitOption } from "@/services/types";

type dbGetEntriesProps = Pick<Entry, "ownerId"> &
  Partial<Pick<Entry, "status" | "notebookId">> &
  LimitOption;

export const dbGetEntries = async ({
  ownerId,
  status,
  notebookId,
  limit = 50,
}: dbGetEntriesProps): Promise<Entry[]> => {
  const andClauses = [eq(entries.ownerId, ownerId)];
  if (status) andClauses.push(eq(entries.status, status));
  if (notebookId) andClauses.push(eq(entries.notebookId, notebookId));

  const result = await db.query.entries.findMany({
    where: and(...andClauses),
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
