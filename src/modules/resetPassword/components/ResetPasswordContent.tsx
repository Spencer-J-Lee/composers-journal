"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ShimmerForm } from "@/components/shimmerLoaders/ShimmerForm";
import { routes } from "@/constants/routes";
import { useUser } from "@/hooks/useUser";
import { showErrorToast } from "@/utils/client/toasts";

import { ResetPasswordForm } from "./ResetPasswordForm";

export const ResetPasswordContent = () => {
  const router = useRouter();
  const { user, isPending } = useUser();
  const searchParams = useSearchParams();

  /**
   * Supabase auth error data is located in the search params of magic links.
   * https://supabase.com/docs/guides/auth/debugging/error-codes
   *
   * Example:
   * - `error=access_denied`
   * - `error_code=otp_expired`
   * - `error_description=Email+link+is+invalid+or+has+expired ...`
   */
  const errorCode = searchParams.get("error_code");

  /**
   * Normally, redirects are handled server-side. In this case, we handle it
   * here because Supabase OTP auth doesn't finalize until we hit the client.
   */
  useEffect(() => {
    if (!isPending && !user) {
      router.push(routes.login());
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (errorCode === "otp_expired") {
      showErrorToast("Link is expired. Please request a new one.");
      router.push(routes.forgotPassword());
    }
  }, [errorCode, router]);

  if (!isPending && user) {
    return (
      <>
        <ResetPasswordForm />
      </>
    );
  }

  return <ShimmerForm fieldCount={1} />;
};
