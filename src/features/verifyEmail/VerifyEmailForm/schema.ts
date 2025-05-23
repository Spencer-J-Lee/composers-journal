import { z } from "zod";

import { emailSchema } from "@/schemas";

export const verifyEmailSchema = z.object({
  email: emailSchema,
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
