import { z } from "zod";

export const idsSchema = z.object({
  ids: z.array(z.number()),
});

export const idsOptionalSchema = idsSchema.partial({ ids: true });
