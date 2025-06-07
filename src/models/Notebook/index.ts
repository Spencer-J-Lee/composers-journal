import { InferSelectModel } from "drizzle-orm";

import { notebooks } from "@/db/schema";

export type Notebook = InferSelectModel<typeof notebooks>;
