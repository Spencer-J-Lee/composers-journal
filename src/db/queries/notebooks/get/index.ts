import { User } from "@supabase/supabase-js";
import { and, count, desc, eq, inArray, sql } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { entries, notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";
import { Status, STATUSES } from "@/models/types/status";
import { CommonApiOptions } from "@/services/types";
import { withFirstResult } from "@/utils/server/withFirstResults";

import { NotebookMetrics } from "./types";

type DbGetNotebooksProps = { ids?: Notebook["id"][] } & Partial<
  Pick<Notebook, "ownerId" | "name" | "status">
> &
  CommonApiOptions<typeof notebooks>;

export const dbGetNotebooks = async ({
  ownerId,
  ids,
  name,
  status,
  limit = 50,
}: DbGetNotebooksProps): Promise<Notebook[]> => {
  const andClauses = [];
  if (ownerId) andClauses.push(eq(notebooks.ownerId, ownerId));
  if (ids) andClauses.push(inArray(notebooks.id, ids));
  if (name) andClauses.push(eq(notebooks.name, name));
  if (status) andClauses.push(eq(notebooks.status, status));

  const result = await db.query.notebooks.findMany({
    where: and(...andClauses),
    orderBy: [desc(notebooks.name)],
    limit,
  });

  return result.map((notebook) => ({
    ...notebook,
    status: notebook.status as Status,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString(),
  }));
};

export const dbGetActiveNotebookById = async (id: Notebook["id"]) => {
  return withFirstResult(
    () => dbGetNotebooks({ ids: [id], status: STATUSES.ACTIVE }),
    ERROR_MESSAGES.DEV.FETCH.NO_NOTEBOOK(id),
  );
};

type DbGetNotebookMetricsProps = {
  ownerId: User["id"];
};

export const dbGetNotebookMetrics = async ({
  ownerId,
}: DbGetNotebookMetricsProps): Promise<NotebookMetrics> => {
  const andClauses = [];
  if (ownerId) andClauses.push(eq(notebooks.ownerId, ownerId));

  const totalNotebooks = await db.query.notebooks
    .findMany({
      where: and(...andClauses),
      columns: { id: true },
    })
    .then((rows) => rows.length);

  const COUNT_KEY = "entryCount";
  const largestNotebookRow = await db
    .select({
      id: notebooks.id,
      name: notebooks.name,
      [COUNT_KEY]: count(entries.id).as(COUNT_KEY),
    })
    .from(notebooks)
    .leftJoin(entries, eq(notebooks.id, entries.notebookId))
    .where(and(...andClauses))
    .groupBy(notebooks.id)
    .orderBy(desc(sql`${COUNT_KEY}`))
    .limit(1);

  return {
    totalNotebooks,
    largestNotebook: largestNotebookRow[0]
      ? {
          id: largestNotebookRow[0].id,
          name: largestNotebookRow[0].name,
          entryCount: largestNotebookRow[0].entryCount,
        }
      : null,
  };
};
