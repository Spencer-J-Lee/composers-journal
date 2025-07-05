import { z } from "zod";

import { emailSchema } from "@/schemas/emailSchema";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
