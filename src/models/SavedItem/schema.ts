import { z } from "zod";

export const savedItemSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  entryId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
