import { createClientCS } from ".";

/**
 * Returns the current session on client-side
 */
export const getSessionCS = async () => {
  const supabase = createClientCS();
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
