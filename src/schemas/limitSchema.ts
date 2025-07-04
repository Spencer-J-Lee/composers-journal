import { z } from "zod";

// TODO: clean up
export const limitSchema = z.object({
  limit: z.number(),
});
