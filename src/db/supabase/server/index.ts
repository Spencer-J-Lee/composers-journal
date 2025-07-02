import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getUserSS } from "./helpers";
import { getSupabaseEnv } from "../helpers";

/**
 * Creates a Supabase client to be used on server-side
 */
export const createClientSS = async () => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

// TODO: remove index files
export { getUserSS };
