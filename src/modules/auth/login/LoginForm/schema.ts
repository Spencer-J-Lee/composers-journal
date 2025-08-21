import { z } from "zod";

import { captchaTokenSchema } from "@/schemas/captchaTokenSchema";
import { emailSchema } from "@/schemas/emailSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
  captchaToken: captchaTokenSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
