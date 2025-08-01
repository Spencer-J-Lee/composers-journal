import { and, eq, inArray, like, not, sql } from "drizzle-orm";

import { db } from "@/db";
import { tags } from "@/db/schema";
import { Tag } from "@/models/Tag";
import { CommonApiOptions } from "@/services/types";

import { convertOrderByToSql } from "../utils/convertOrderByToSql";
import { lower } from "../utils/lower";

type dbGetTagsProps = { searchStr?: string; notIds?: Tag["id"][] } & Partial<
  Pick<Tag, "ownerId">
> &
  CommonApiOptions<typeof tags>;

export const dbGetTags = async ({
  ownerId,
  searchStr,
  notIds,
  limit = 50,
  offset = 0,
  orderBy,
}: dbGetTagsProps): Promise<Tag[]> => {
  const andClauses = [];
  if (searchStr) {
    andClauses.push(like(lower(tags.name), `%${searchStr.toLowerCase()}%`));
  }
  if (notIds) andClauses.push(not(inArray(tags.id, notIds)));
  if (ownerId) andClauses.push(eq(tags.ownerId, ownerId));

  const orderByClause = searchStr
    ? sql`position(lower(${searchStr}) in lower(${tags.name}))`
    : convertOrderByToSql(tags, orderBy);

  const result = await db.query.tags.findMany({
    where: and(...andClauses),
    orderBy: orderByClause,
    limit,
    offset,
  });

  const formattedData = result.map(({ createdAt, updatedAt, ...props }) => {
    return {
      ...props,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  });

  return formattedData;
};
