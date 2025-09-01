import { z } from "zod";

import { captchaTokenSchema } from "@/schemas/captchaTokenSchema";
import { emailSchema } from "@/schemas/emailSchema";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
  captchaToken: captchaTokenSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
