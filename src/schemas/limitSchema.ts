import { z } from "zod";

export const limitSchema = z.object({
  limit: z.number(),
});
