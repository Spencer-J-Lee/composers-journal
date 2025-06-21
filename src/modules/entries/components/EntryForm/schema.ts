import { z } from "zod";

import { entrySchema } from "@/models/Entry/schema";

export const entryFormSchema = entrySchema.pick({
  title: true,
  description: true,
});

export type EntryFormValues = z.infer<typeof entryFormSchema>;
