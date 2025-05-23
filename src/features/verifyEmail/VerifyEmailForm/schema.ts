import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
