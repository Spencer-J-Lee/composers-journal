import { InferSelectModel } from "drizzle-orm";

import { savedItems } from "@/db/schema";

export type SavedItem = InferSelectModel<typeof savedItems>;
