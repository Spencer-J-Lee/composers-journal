import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  // TODO: Add stronger password validation
  password: z.string().min(8, "Passwords needs to be at least 8 character"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
