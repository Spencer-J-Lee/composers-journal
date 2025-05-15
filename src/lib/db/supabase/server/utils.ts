import { createClientSS } from ".";

/**
 * Returns the current session on server-side
 */
export const getSessionSS = async () => {
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
