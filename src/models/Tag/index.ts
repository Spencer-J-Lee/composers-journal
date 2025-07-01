import { InferSelectModel } from "drizzle-orm";

import { tags } from "@/db/schema";

import { WithDateStrings } from "../types/status";

export type Tag = WithDateStrings<InferSelectModel<typeof tags>>;
