import { z } from "zod";

import { captchaTokenSchema } from "@/schemas/captchaTokenSchema";
import { emailSchema } from "@/schemas/emailSchema";
import { passwordSchema } from "@/schemas/passwordSchema";

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  captchaToken: captchaTokenSchema,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
