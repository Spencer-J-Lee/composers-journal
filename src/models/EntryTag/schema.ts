import { z } from "zod";

export const entryTagSchema = z.object({
  id: z.number(),
  entryId: z.number(),
  tagId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
