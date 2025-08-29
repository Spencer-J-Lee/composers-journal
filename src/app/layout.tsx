import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { AlertDialog } from "@/components/dialogs/AlertDialog/AlertDialog";
import Providers from "@/components/Providers";
import { SkipToContent } from "@/components/SkipToContent";
import { inter } from "@/styles/fonts";

import "../styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Composer's Journal",
  description: "Application to help track and manage composition techniques.",
};

// TODO: add favicon
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-background text-text h-auto min-h-screen antialiased`}
      >
        <Providers>
          <SkipToContent />

          {/* 
            Toaster should always be placed above children otherwise messages
            will not show if toast is called on initial page load.
           */}
          <Toaster richColors />

          {children}
          <AlertDialog />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
