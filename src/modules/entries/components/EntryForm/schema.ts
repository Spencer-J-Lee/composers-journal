import { z } from "zod";

import { entrySchema } from "@/models/Entry/schema";
import { Tag } from "@/models/Tag";

export const entryFormSchema = entrySchema.pick({
  title: true,
  description: true,
  tags: true,
});

export type EntryFormValues = z.infer<typeof entryFormSchema> & {
  tags: Tag[];
};
