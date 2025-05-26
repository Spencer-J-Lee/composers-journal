import { User } from "@supabase/supabase-js";

import { createClientSS } from ".";

/**
 * Returns the current user.
 * Should only be used on server-side.
 */
export const getUserSS = async (): Promise<User | null> => {
  const supabase = await createClientSS();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
