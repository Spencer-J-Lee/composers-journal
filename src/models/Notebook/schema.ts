import { z } from "zod";

import { isStatus } from "../helpers/status";

export const notebookSchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  name: z.string().min(1, "Name is required"),
  status: z.string().refine(isStatus, { message: "Invalid status" }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
