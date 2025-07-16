import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  name: z.string().min(1, "Name is required"),
  createdAt: z.string(),
  updatedAt: z.string(),
});
