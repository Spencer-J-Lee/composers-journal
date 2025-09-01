"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { handleSignInWithGoogle } from "@/services/auth/google";

import { themeMap } from "./constants";

type GSIButtonProps = {
  redirectTo: string;
  variant?: "white" | "blue" | "black";
  className?: string;
};

export const GSIButton = ({
  redirectTo,
  variant = "white",
  className,
}: GSIButtonProps) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not defined");
    }

    /**
     * - Checks if the Google Identity Services (GIS) script is already loaded.
     * - If not, inject the script tag and resolve on load.
     * - We do this because in Next.js with client-side routing,
     *   scripts don’t automatically reload when navigating between pages.
     *   Without this, the Google API might be undefined.
     */
    const ensureScript = () => {
      return new Promise<void>((resolve) => {
        if (window.google?.accounts?.id) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    ensureScript().then(() => {
      /**
       * - Initializes the GIS client with our OAuth client ID and a callback.
       * - Instead of redirecting (Google’s default) immediately,
       *   we use the token to sign the user into Supabase, then redirect.
       */
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          handleSignInWithGoogle(response, () => router.push(redirectTo));
        },
      });

      if (buttonRef.current) {
        // Clear out previously rendered button before rendering the new one
        buttonRef.current.innerHTML = "";

        // Renders the actual "Sign in with Google" button into our ref div.
        window.google?.accounts.id.renderButton(buttonRef.current, {
          theme: themeMap[variant],
          width: 400,
          logo_alignment: "center",
          text: "continue_with",
        });
      }
    });
  }, [redirectTo, variant, router]);

  // Google injects an iframe into this div when renderButton is called.
  return <div ref={buttonRef} className={className} />;
};
