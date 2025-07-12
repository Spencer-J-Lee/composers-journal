import { z } from "zod";

export const idsSchema = z.object({
  ids: z.array(z.number()),
});
