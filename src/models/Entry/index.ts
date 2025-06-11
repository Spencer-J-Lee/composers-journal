import { InferSelectModel } from "drizzle-orm";

import { entries } from "@/db/schema";

import { Tag } from "../Tag";

export type Entry = InferSelectModel<typeof entries> & {
  tags: Tag[];
};
