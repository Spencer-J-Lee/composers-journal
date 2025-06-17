import { z } from "zod";

import { notebookSchema } from "@/models/Notebook/schema";

export const notebookFormSchema = notebookSchema.pick({
  name: true,
});

export type NotebookFormValues = z.infer<typeof notebookFormSchema>;
