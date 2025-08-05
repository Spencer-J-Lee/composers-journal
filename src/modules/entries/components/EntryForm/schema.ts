import { z } from "zod";

import { entrySchema } from "@/models/Entry/schema";

import { tagOptionSchema } from "./TagsEditor/TagsDialog/schema";

export const entryFormSchema = entrySchema
  .pick({
    title: true,
    description: true,
  })
  .merge(
    z.object({
      tagOptions: z.array(tagOptionSchema),
    }),
  );

export type EntryFormValues = z.infer<typeof entryFormSchema>;
