import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./helper";

export const getSupabase = () => {
  const { url, key } = getSupabaseEnv();

  return createBrowserClient(url, key);
};
