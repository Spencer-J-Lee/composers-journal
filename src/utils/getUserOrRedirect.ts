import { redirect } from "next/navigation";

import { routes } from "@/constants/routes";
import { getUserSS } from "@/db/supabase/server";

export const getUserOrRedirect = async (redirectTo = routes.login()) => {
  const user = await getUserSS();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
};
