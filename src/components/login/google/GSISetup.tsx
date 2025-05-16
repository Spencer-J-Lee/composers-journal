"use client";

import { useEffect } from "react";

import { handleSignInWithGoogle } from "@/lib/auth/google";

/**
 * Only one instance of this component should exist on any given page
 */
export const GSISetup = () => {
  useEffect(() => {
    (window as any).handleSignInWithGoogle = handleSignInWithGoogle;
  }, []);

  return (
    <div
      id="g_id_onload"
      data-client_id="566168806410-ujm0rgih0ka5432lm90o2v2v8qsss8cg.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleSignInWithGoogle"
      data-auto_prompt="false"
      data-use_fedcm_for_prompt="true"
    />
  );
};
