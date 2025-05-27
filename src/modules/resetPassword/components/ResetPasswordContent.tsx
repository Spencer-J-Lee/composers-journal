"use client";

import { ELEMENT_IDS } from "@/constants/elementIds";

import { ResetPasswordForm } from "./ResetPasswordForm";

export const ResetPasswordContent = () => {
  return (
    <main id={ELEMENT_IDS.MAIN_CONTENT} className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <p>Choose a new password</p>
        <ResetPasswordForm />
      </div>
    </main>
  );
};
