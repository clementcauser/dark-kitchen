import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/shadcn-ui";

export const metadata: Metadata = {
  title: "🍕 Dark Kitchen",
  description: "Commander n'a jamais été aussi facile",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen font-poppins antialiased",
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
