import { z } from "zod";

import { isStatus } from "../helpers";

export const notebookSchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  name: z.string().min(1, "Name is required"),
  status: z.string().refine(isStatus, { message: "Invalid status" }),
  createdAt: z.coerce.date({ required_error: "Missing created at" }),
  updatedAt: z.coerce.date({ required_error: "Missing updated at" }),
});
