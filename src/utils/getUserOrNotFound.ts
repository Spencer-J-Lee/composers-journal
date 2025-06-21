import { notFound } from "next/navigation";

import { getUserSS } from "@/db/supabase/server";

export const getUserOrNotFound = async () => {
  const user = await getUserSS();

  if (!user) {
    notFound();
  }

  return user;
};
