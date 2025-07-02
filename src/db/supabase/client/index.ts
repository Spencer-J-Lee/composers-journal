import { createBrowserClient } from "@supabase/ssr";

import { getUserCS } from "./helpers";
import { getSupabaseEnv } from "../helpers";

/**
 * Creates a Supabase client to be used on client-side
 */
export const createClientCS = () => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv();

  return createBrowserClient(supabaseUrl, supabaseKey);
};

// TODO: remove index files
export { getUserCS };
