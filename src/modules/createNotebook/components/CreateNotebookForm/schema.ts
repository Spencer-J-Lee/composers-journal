import { z } from "zod";

import { notebookSchema } from "@/models/Notebook/schema";

export const createNotebookSchema = notebookSchema.pick({
  name: true,
});

export type CreateNotebookFormValues = z.infer<typeof createNotebookSchema>;
