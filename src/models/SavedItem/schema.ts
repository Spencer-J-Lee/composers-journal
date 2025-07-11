import { z } from "zod";

export const savedItemSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  entryId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
