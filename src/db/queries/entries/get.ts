import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { LimitOption } from "@/services/types";

type dbGetEntriesProps = Partial<
  Pick<Entry, "ownerId" | "id" | "status" | "notebookId">
> &
  LimitOption;

export const dbGetEntries = async ({
  ownerId,
  id,
  status,
  notebookId,
  limit = 50,
}: dbGetEntriesProps): Promise<Entry[]> => {
  const andClauses = [];
  if (ownerId) andClauses.push(eq(entries.ownerId, ownerId));
  if (id) andClauses.push(eq(entries.id, id));
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
