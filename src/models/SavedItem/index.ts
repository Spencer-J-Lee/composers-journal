import { InferSelectModel } from "drizzle-orm";

import { savedItems } from "@/db/schema";

import { WithDateStrings } from "../types/status";

export type SavedItem = WithDateStrings<InferSelectModel<typeof savedItems>>;
