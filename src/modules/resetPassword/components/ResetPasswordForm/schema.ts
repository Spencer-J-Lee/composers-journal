import { z } from "zod";

import { passwordSchema } from "@/schemas/passwordSchema";

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
