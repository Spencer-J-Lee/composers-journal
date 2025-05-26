import { createBrowserClient } from "@supabase/ssr";

import { getUserCS } from "./helpers";
import { getSupabaseEnv } from "../shared/helpers";

/**
 * Creates a Supabase client to be used on client-side
 */
export const createClientCS = () => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv();

  return createBrowserClient(supabaseUrl, supabaseKey);
};

export { getUserCS };
