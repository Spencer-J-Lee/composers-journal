"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { getUserCS } from "@/db/supabase/client";

import { VerificationStatus } from "./types";
import { VerifyEmailForm } from "../VerifyEmailForm";

/**
 * User will be authenticated before being redirected based on authentication.
 * Redirect is based on the given URL in the query parameters if provided.
 */
export const VerifyEmailCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>("verifying");

  useEffect(() => {
    getUserCS().then((user) => {
      if (user) {
        const redirectUrl =
          searchParams.get(QUERY_KEYS.REDIRECT_URL) ?? DEFAULT_PROTECTED_ROUTE;
        router.replace(redirectUrl);
      } else {
        setStatus("invalid");
      }
    });
  }, [searchParams, router]);

  return (
    <>
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
        </>
      )}

      {status === "resent" && (
        <>
          <p>Verification link has been sent.</p>
          <p>Please allow up to one minute to receive the link.</p>
        </>
      )}

      {(status === "invalid" || status === "resent") && <VerifyEmailForm />}
    </>
  );
};
