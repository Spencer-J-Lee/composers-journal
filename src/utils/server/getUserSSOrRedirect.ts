import { redirect } from "next/navigation";

import { routes } from "@/constants/routes";
import { getUserSS } from "@/db/supabase/server/helpers";

/**
 *
 */
export const getUserSSOrRedirect = async (redirectTo = routes.login()) => {
  const user = await getUserSS();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
};
