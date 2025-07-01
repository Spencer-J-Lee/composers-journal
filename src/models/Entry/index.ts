import { InferSelectModel } from "drizzle-orm";

import { entries } from "@/db/schema";

import { Tag } from "../Tag";
import { WithDateStrings } from "../types/status";

export type Entry = WithDateStrings<InferSelectModel<typeof entries>> & {
  tags: Tag[];
};
