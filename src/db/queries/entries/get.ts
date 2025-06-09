import { eq } from "drizzle-orm";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { Entry } from "@/models/Entry";

type dbGetEntriesProps = Pick<Entry, "ownerId">;

export const dbGetEntries = async ({ ownerId }: dbGetEntriesProps) => {
  // TODO: add limits and order by desc entries.createdAt
  const result = await db.query.entries.findMany({
    where: eq(entries.ownerId, ownerId),
  });

  return result;
};
