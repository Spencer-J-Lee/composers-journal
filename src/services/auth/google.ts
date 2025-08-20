import { createClientCS } from "@/db/supabase/client/createClientCS";

export type GoogleCredentialResponse = {
  credential: string;
  select_by: string;
  clientId?: string;
};

export const handleSignInWithGoogle = async (
  response: GoogleCredentialResponse,
  onSuccess: () => void,
) => {
  const supabase = createClientCS();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });

  if (error) {
    console.error("Google sign-in failed:", error);
  } else {
    onSuccess();
  }
};
