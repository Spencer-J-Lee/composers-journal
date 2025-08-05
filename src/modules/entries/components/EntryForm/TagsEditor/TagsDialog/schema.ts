import { z } from "zod";

export const tagOptionSchema = z.object({
  value: z.number(),
  label: z.string(),
  isNew: z.boolean().optional(),
});
