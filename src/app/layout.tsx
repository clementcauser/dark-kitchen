import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-poppins antialiased",
          poppins.variable
        )}
      >
        <p>THIS IS A TEST</p>
        {children}
      </body>
    </html>
  );
}
