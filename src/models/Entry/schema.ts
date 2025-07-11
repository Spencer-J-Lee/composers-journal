import { z } from "zod";

import { isStatus } from "../helpers/status";

export const entrySchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  notebookId: z.number().min(1),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().refine(isStatus, { message: "Invalid status" }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
