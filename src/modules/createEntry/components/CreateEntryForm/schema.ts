import { z } from "zod";

import { entrySchema } from "@/models/Entry/schema";

export const createEntrySchema = entrySchema.pick({
  title: true,
  description: true,
});

export type CreateEntryFormValues = z.infer<typeof createEntrySchema>;
