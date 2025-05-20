"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { getSessionCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";

import { ELEMENT_IDS } from "../../constants/elementIds";

/**
 * User will be authenticated before being redirected based on authentication.
 * Redirect is based on the given URL in the query parameters if provided.
 */
export const VerifyEmailCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getSessionCS().then((session) => {
      const redirectUrl =
        searchParams.get(QUERY_KEYS.REDIRECT_URL) ?? routes.search();

      router.replace(session && redirectUrl ? redirectUrl : routes.home());
    });
  }, [searchParams, router]);

  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <p>Verifying...</p>
        <p>Hang on tight while we log you in.</p>
      </div>
    </main>
  );
};
