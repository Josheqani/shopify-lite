import { faIR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import { Header } from "@/components/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { HubPopWidget } from "@/components/HubPopWidget";

// Vazirmatn (Persian) from Google Fonts via next/font/google. Next.js
// downloads it at build time and self-hosts it with the app.
const persianFont = Vazirmatn({
  subsets: ["arabic"],
  weight: "variable",
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
    <ClerkProvider
      localization={faIR}
      appearance={{
        elements: {
          otpCodeFieldInputs: { direction: "ltr" },
          otpCodeFieldInput: { direction: "ltr", textAlign: "center" },
        },
      }}
    >
      <html
        lang="fa"
        dir="rtl"
        className={`${persianFont.variable} h-full antialiased`}
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
          <HubPopWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
