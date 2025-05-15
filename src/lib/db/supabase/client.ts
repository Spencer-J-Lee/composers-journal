import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./helpers";

export const createClientCS = () => {
  const { url, key } = getSupabaseEnv();

  return createBrowserClient(url, key);
};
