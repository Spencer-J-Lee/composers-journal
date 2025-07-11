import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";

import Providers from "@/components/Providers";
import { SkipToContent } from "@/components/SkipToContent";
import { inter } from "@/styles/fonts";

import "../../styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/globals.css";
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
      <head>
        <Script src="https://accounts.google.com/gsi/client" async />
      </head>

      <body
        className={`${inter.variable} bg-background text-text h-auto min-h-screen antialiased`}
      >
        <Providers>
          <SkipToContent />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
