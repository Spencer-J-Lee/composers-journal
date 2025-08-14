import { User } from "@supabase/supabase-js";
import { and, count, desc, eq, gte, inArray, sql } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries, entryTags, tags } from "@/db/schema";
import { Entry } from "@/models/Entry";
import { STATUSES } from "@/models/types/status";
import { CommonApiOptions } from "@/services/types";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { EntryMetrics } from "./types";
import { convertOrderByToSql } from "../../utils/convertOrderByToSql";

type DbGetEntriesProps = { ids?: Entry["id"][] } & Partial<
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
}: DbGetEntriesProps): Promise<Entry[]> => {
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

type DbGetEntryMetricsProps = {
  ownerId: User["id"];
};

export const dbGetEntryMetrics = async ({
  ownerId,
}: DbGetEntryMetricsProps): Promise<EntryMetrics> => {
  const ownerClause = eq(entries.ownerId, ownerId);

  const activeEntries = await db.query.entries
    .findMany({
      where: and(eq(entries.status, STATUSES.ACTIVE), ownerClause),
      columns: { id: true },
    })
    .then((rows) => rows.length);

  const trashedEntries = await db.query.entries
    .findMany({
      where: and(eq(entries.status, STATUSES.TRASHED), ownerClause),
      columns: { id: true },
    })
    .then((rows) => rows.length);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentEntries = await db.query.entries
    .findMany({
      where: and(gte(entries.createdAt, thirtyDaysAgo), ownerClause),
      columns: { id: true },
    })
    .then((rows) => rows.length);

  const topTags = await db
    .select({
      id: tags.id,
      name: tags.name,
      usageCount: count(entryTags.entryId).as("usageCount"),
    })
    .from(entryTags)
    .innerJoin(tags, eq(entryTags.tagId, tags.id))
    .innerJoin(entries, eq(entryTags.entryId, entries.id))
    .where(and(ownerClause, eq(entries.status, STATUSES.ACTIVE)))
    .groupBy(tags.id, tags.name)
    .orderBy(desc(sql<number>`count(${entryTags.entryId})`))
    .limit(3);

  return {
    activeEntries,
    trashedEntries,
    recentEntries,
    topTags,
  };
};
