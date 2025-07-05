import { User } from "@supabase/supabase-js";

import { createClientSS } from "./createClientSS";

/**
 * Returns the current user.
 * Should only be used on server-side.
 */
export const getUserSS = async (): Promise<User | null> => {
  const supabase = await createClientSS();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error && error.name !== "AuthSessionMissingError") {
    console.error(error);
  }

  return user;
};
