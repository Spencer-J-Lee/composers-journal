// import { Tag } from "@/models/Tag";

import { entries } from "@/db/schema";
import { OrderBy } from "@/types/query";

export type EntryFilter = {
  orderBy: OrderBy<typeof entries>;
  // TODO: [very high] handle filtering
  // tags: Tag["id"][];
  // savedOnly: boolean;
  // TODO: [med] free text search
  // search: string;
};
