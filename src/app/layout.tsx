import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import Provider from "./provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mode Revive | Page d'accueil",
  description: "Votre boutique de seconde main en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-backgroundRevive font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          <Navbar />
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
