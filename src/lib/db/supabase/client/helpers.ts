import { User } from "@supabase/supabase-js";

import { createClientCS } from ".";

/**
 * Returns the current user.
 * Should only be used on server-side.
 */
export const getUserCS = async (): Promise<User | null> => {
  const supabase = await createClientCS();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error && error.name !== "AuthSessionMissingError") {
    console.error(error);
  }

  return user;
};
