import { z } from "zod";

import { isStatus } from "../helpers/status";
import { tagSchema } from "../Tag/schema";

export const entrySchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  notebookId: z.number().min(1),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(tagSchema),
  status: z.string().refine(isStatus, { message: "Invalid status" }),
  createdAt: z.string(),
  updatedAt: z.string(),
});
