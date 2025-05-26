import { Session, User } from "@supabase/supabase-js";

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

/**
 * Returns the current session on server-side
 */
export const getSessionSS = async (): Promise<Session | null> => {
  const supabase = await createClientSS();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    // TODO: add better error handling
    console.log(error);
    return null;
  }

  return session;
};
