"use client";

import { ELEMENT_IDS } from "@/components/shared/constants/elementIds";
import { GSIButton } from "@/components/login/google/GSIButton";
import { Button } from "@/components/shared/buttons/Button";
import { getSupabase } from "@/lib/db/supabase/client";

export default function Login() {
  const supabase = getSupabase();

  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT}>
      {/* TODO: Add login functionality */}
      <Button
        onClick={async () => {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          console.log(`session:`, session);
        }}
      >
        Log Session
      </Button>
      <Button
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          console.error(`error:`, error);
        }}
      >
        Log Out
      </Button>
      <GSIButton />
    </main>
  );
}
