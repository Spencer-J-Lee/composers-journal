"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { getSessionCS } from "@/lib/db/supabase/client";
import { routes } from "@/routes/routes";

import { VerificationStatus } from "./types";
import { ELEMENT_IDS } from "../../constants/elementIds";
import { VerifyEmailForm } from "../../features/verifyEmail/VerifyEmailForm";

/**
 * User will be authenticated before being redirected based on authentication.
 * Redirect is based on the given URL in the query parameters if provided.
 */
export const VerifyEmailCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>("verifying");

  useEffect(() => {
    getSessionCS().then((session) => {
      if (session) {
        const redirectUrl =
          searchParams.get(QUERY_KEYS.REDIRECT_URL) ?? routes.search();
        router.replace(redirectUrl);
      } else {
        setStatus("invalid");
      }
    });
  }, [searchParams, router]);

  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <div className="w-full max-w-md">
        {status === "verifying" && (
          <>
            <p>Verifying...</p>
            <p>Hang on tight while we log you in.</p>
          </>
        )}

        {status === "invalid" && (
          <>
            <p className="text-negative-text font-semibold">
              Verification link has expired or is invalid.
            </p>
            <p>Please request a new verification email.</p>
            <VerifyEmailForm />
          </>
        )}

        {status === "resent" && (
          <>
            <p>Verification link has been sent.</p>
            <p>Please allow up to one minute to receive the link.</p>
          </>
        )}
      </div>
    </main>
  );
};
