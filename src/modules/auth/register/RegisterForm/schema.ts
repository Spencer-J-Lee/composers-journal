import { z } from "zod";

import { emailSchema } from "@/schemas/emailSchema";
import { passwordSchema } from "@/schemas/passwordSchema";

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
