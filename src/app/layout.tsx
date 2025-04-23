import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import { inter } from "@/styles/fonts";

import "../styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Composer's Toolkit",
  description: "Application to help track and manage composition techniques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-background text-primary min-h-screen antialiased`}
      >
        <Navbar />
        <div className="h-[3000px]"></div>
        {children}
      </body>
    </html>
  );
}
