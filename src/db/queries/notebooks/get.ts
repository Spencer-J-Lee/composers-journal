import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";
import { Status } from "@/models/types/status";

type dbGetNotebooksProps = { limit?: number } & Pick<Notebook, "ownerId"> &
  Partial<Pick<Notebook, "name" | "status">>;

export const dbGetNotebooks = async ({
  ownerId,
  name,
  status,
  limit = 50,
}: dbGetNotebooksProps): Promise<Notebook[]> => {
  const andClauses = [eq(notebooks.ownerId, ownerId)];
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
  }));
};
