import { InferSelectModel } from "drizzle-orm";

import { notebooks } from "@/db/schema";

import { WithDateStrings } from "../types/status";

export type Notebook = WithDateStrings<InferSelectModel<typeof notebooks>>;
