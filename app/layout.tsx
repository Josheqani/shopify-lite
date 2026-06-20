import { faIR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { Header } from "@/components/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// PeydaWeb (Persian) — self-hosted via next/font/local. woff2 only: it is
// supported by every browser Next.js 16 targets, and next/font/local does not
// accept .eot. One entry per weight; note the lowercase filenames for 200/300.
const persianFont = localFont({
  src: [
    { path: "./fonts/woff2/PeydaWeb-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/woff2/peydaWeb-extralight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/woff2/peydaWeb-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/woff2/PeydaWeb-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/woff2/PeydaWeb-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/woff2/PeydaWeb-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/woff2/PeydaWeb-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/woff2/PeydaWeb-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/woff2/PeydaWeb-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-persian",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "فروشگاه لایت",
    template: "%s · فروشگاه لایت",
  },
  description: "خرید آنلاین آسان و سریع",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={faIR}>
      <html
        lang="fa"
        dir="rtl"
        className={`${geistSans.variable} ${geistMono.variable} ${persianFont.variable} h-full antialiased`}
      >
        <body className={`${persianFont.variable} flex min-h-full flex-col`}>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            <PageTransition>{children}</PageTransition>
          </main>
          <footer className="border-t">
            <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
              فروشگاه لایت — یه فروشگاه سریع و بی دغدغه.
            </div>
          </footer>
          <Toaster position="top-left" richColors expand />
        </body>
      </html>
    </ClerkProvider>
  );
}
