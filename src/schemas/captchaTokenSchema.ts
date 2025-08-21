import { z } from "zod";

export const captchaTokenSchema = z.string().min(1, "Captcha is required.");
