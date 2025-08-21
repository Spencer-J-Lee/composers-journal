import { GoogleCredentialResponse } from "@/services/auth/google";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              width?: number;
              logo_alignment?: "left" | "center";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
            },
          ) => void;
        };
      };
    };
  }
}

export {};
