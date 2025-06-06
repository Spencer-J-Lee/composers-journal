import { eq } from "drizzle-orm";

import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { Notebook } from "@/models/Notebook";
import { Status } from "@/models/types";

export const dbGetNotebooks = async (userId: string): Promise<Notebook[]> => {
  // TODO: add limits and order by desc notebooks.name
  const result = await db
    .select()
    .from(notebooks)
    .where(eq(notebooks.ownerId, userId));

  return result.map((notebook) => ({
    ...notebook,
    status: notebook.status as Status,
  }));
};
