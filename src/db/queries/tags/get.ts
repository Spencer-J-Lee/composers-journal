import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { tags } from "@/db/schema";
import { Tag } from "@/models/Tag";
import { CommonApiOptions } from "@/services/types";

import { convertOrderByToSql } from "../utils/convertOrderByToSql";

type DbGetTagsProps = Partial<Pick<Tag, "ownerId">> &
  CommonApiOptions<typeof tags>;

export const dbGetTags = async ({
  ownerId,
  limit = 50,
  offset = 0,
  orderBy,
}: DbGetTagsProps): Promise<Tag[]> => {
  const andClauses = [];
  if (ownerId) andClauses.push(eq(tags.ownerId, ownerId));

  const result = await db.query.tags.findMany({
    where: and(...andClauses),
    orderBy: convertOrderByToSql(tags, orderBy),
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
