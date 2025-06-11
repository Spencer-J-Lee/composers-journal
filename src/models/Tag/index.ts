import { InferSelectModel } from "drizzle-orm";

import { tags } from "@/db/schema";

export type Tag = InferSelectModel<typeof tags>;
