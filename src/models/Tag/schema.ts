import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  name: z.string().min(1, "Name is required"),
  createdAt: z.coerce.date({ required_error: "Missing created at" }),
  updatedAt: z.coerce.date({ required_error: "Missing updated at" }),
});
