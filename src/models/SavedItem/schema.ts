import { z } from "zod";

export const savedItemSchema = z.object({
  id: z.number(),
  ownerId: z.string(),
  entryId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
