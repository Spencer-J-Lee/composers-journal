import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "../shared/helpers";
import { getSessionCS } from "./helpers";

/**
 * Creates a Supabase client to be used on client-side
 */
export const createClientCS = () => {
  const { url, key } = getSupabaseEnv();

  return createBrowserClient(url, key);
};

export { getSessionCS };
