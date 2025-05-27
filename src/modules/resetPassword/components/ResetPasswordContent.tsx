"use client";

import { PageWrapper } from "@/components/pageWrappers/PageWrapper";

import { ResetPasswordForm } from "./ResetPasswordForm";

export const ResetPasswordContent = () => {
  return (
    <PageWrapper maxWidth="md">
      <p>Choose a new password</p>
      <ResetPasswordForm />
    </PageWrapper>
  );
};
