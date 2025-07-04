import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { CommonApiOptions } from "@/services/types";

import { convertOrderByToSql } from "../utils/convertOrderByToSql";

type dbGetEntriesProps = Partial<
  Pick<Entry, "ownerId" | "id" | "status" | "notebookId">
> &
  CommonApiOptions<typeof entries>;

export const dbGetEntries = async ({
  ownerId,
  id,
  status,
  notebookId,
  limit = 50,
  offset = 0,
  orderBy,
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
    orderBy: convertOrderByToSql(entries, orderBy),
    limit,
    offset,
  });

  const formattedData = result.map(
    ({ entryTags, createdAt, updatedAt, ...props }) => {
      return {
        ...props,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),

        tags: entryTags.map((entryTag) => ({
          ...entryTag.tags,
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
        })),
      };
    },
  );

  return formattedData;
};
