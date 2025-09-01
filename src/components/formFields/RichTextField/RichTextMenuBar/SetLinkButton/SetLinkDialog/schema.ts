import { z } from "zod";

export const setLinkFormSchema = z.object({
  url: z.string(),
});

export type SetLinkFormValues = z.infer<typeof setLinkFormSchema>;
