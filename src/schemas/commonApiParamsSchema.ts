import { z } from "zod";

export const commonApiParamsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  orderBy: z
    .array(
      z.object({
        column: z.string(),
        direction: z.enum(["asc", "desc"]),
      }),
    )
    .optional(),
});
