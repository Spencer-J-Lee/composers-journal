import { z } from "zod";

export const youTubeUrlFormSchema = z.object({
  url: z.string().min(1, "YouTube URL is required"),
});

export type YouTubeUrlFormValues = z.infer<typeof youTubeUrlFormSchema>;
