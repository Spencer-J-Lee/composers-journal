import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import { inter } from "@/styles/fonts";
import { Navbar } from "@/components/Navbar";
import { SkipToContent } from "@/components/shared/SkipToContent";

import "../styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { Footer } from "@/components/Footer";
import Script from "next/script";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Composer's Toolkit",
  description: "Application to help track and manage composition techniques.",
};

// TODO add favicon
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://accounts.google.com/gsi/client" async />
      </head>
      <body
        className={`${inter.variable} bg-background text-text h-auto min-h-screen antialiased`}
      >
        <SkipToContent />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
