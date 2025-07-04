// import { Tag } from "@/models/Tag";

import { entries } from "@/db/schema";
import { OrderBy } from "@/types/query";

export type EntryFilter = {
  orderBy: OrderBy<typeof entries>;
  // TODO: handle filtering
  // tags: Tag["id"][];
  // savedOnly: boolean;
  // TODO: free text search
  // search: string;
};
