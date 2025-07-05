import { createClientCS } from "@/db/supabase/client/createClientCS";

type GoogleCredentialResponse = {
  credential: string;
  select_by: string;
  clientId?: string;
};

export const handleSignInWithGoogle = async (
  response: GoogleCredentialResponse,
) => {
  const supabase = createClientCS();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });

  if (error) {
    console.error(error);
  }
};
