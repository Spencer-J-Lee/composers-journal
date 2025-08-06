import { InferSelectModel } from "drizzle-orm";

import { entryTags } from "@/db/schema";

import { WithDateStrings } from "../types/status";

export type EntryTag = WithDateStrings<InferSelectModel<typeof entryTags>>;
