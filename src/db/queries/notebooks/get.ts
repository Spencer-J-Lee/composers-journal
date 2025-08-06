import { and, desc, eq, inArray } from "drizzle-orm";

import { ERROR_MESSAGES } from "@/constants/messages";
import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";
import { Status, STATUSES } from "@/models/types/status";
import { CommonApiOptions } from "@/services/types";
import { withFirstResult } from "@/utils/server/withFirstResults";

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
