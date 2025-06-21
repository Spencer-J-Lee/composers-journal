import { getUserSS } from "@/db/supabase/server";
import { notFound } from "next/navigation";

export const getUserOrNotFound = async () => {
  const user = await getUserSS();

  if (!user) {
    notFound();
  }

  return user;
};
