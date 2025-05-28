import { z } from "zod";
import { isEntryStatus } from "./helpers";

export const entrySchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().refine(isEntryStatus, { message: "Invalid status" }),
  createdAt: z.coerce.date({ required_error: "Missing created at" }),
  updatedAt: z.coerce.date({ required_error: "Missing updated at" }),
});
