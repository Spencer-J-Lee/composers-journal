import { entries } from "@/db/schema";
import { Tag } from "@/models/Tag";
import { OrderBy } from "@/types/query";

export type EntryFilter = {
  orderBy: OrderBy<typeof entries>;
  tags: Tag["id"][];
  savedOnly: boolean;
  // TODO: [med] free text search
  // search: string;
};
