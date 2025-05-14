import { getSupabase } from "../db/supabase/client";

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId?: string;
}

export const handleSignInWithGoogle = async (
  response: GoogleCredentialResponse,
) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
  // TODO remove console logs
  console.log(`data:`, data);
  console.error(`error:`, error);
};
