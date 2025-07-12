import { and, eq, inArray } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { CommonApiOptions } from "@/services/types";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { convertOrderByToSql } from "../utils/convertOrderByToSql";

type dbGetEntriesProps = { ids?: Entry["id"][] } & Partial<
  Pick<Entry, "ownerId" | "status" | "notebookId">
> &
  CommonApiOptions<typeof entries>;

export const dbGetEntries = async ({
  ownerId,
  ids,
  status,
  notebookId,
  limit = 50,
  offset = 0,
  orderBy,
}: dbGetEntriesProps): Promise<Entry[]> => {
  const andClauses = [];
  if (ownerId) andClauses.push(eq(entries.ownerId, ownerId));
  if (ids) andClauses.push(inArray(entries.id, ids));
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
      savedItem: true,
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
        saved: !!props.savedItem,
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

export const dbGetEntryById = async (
  id: Entry["id"],
  options?: Partial<Pick<Entry, "status">>,
) => {
  return withFirstResult(
    () => dbGetEntries({ ids: [id], status: options?.status }),
    ERROR_MESSAGES.DEV.FETCH.NO_ENTRY(id),
  );
};

export const dbGetActiveEntryById = async (id: Entry["id"]) => {
  return dbGetEntryById(id, { status: STATUSES.ACTIVE });
};
