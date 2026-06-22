import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { getCartCount } from "@/lib/cart";
import { HeaderNav } from "@/components/HeaderNav";

export async function Header() {
  const [count, { userId }] = await Promise.all([getCartCount(), auth()]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <ShoppingBag className="size-5" />
          فروشگاه لایت
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <HeaderNav cartCount={count} />

          {userId ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <LogIn className="size-5" />
                <span className="hidden sm:inline">ورود</span>
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
