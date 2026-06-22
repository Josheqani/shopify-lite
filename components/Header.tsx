import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { getCartCount } from "@/lib/cart";
import { Badge } from "@/components/ui/badge";

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
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              تماس با ما
            </Link>
          </nav>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ShoppingCart className="size-5" />
            <span className="hidden sm:inline">سبد خرید</span>
            {count > 0 ? (
              <Badge className="absolute -top-1 -right-1 size-5 justify-center rounded-full p-0 tabular-nums">
                {count}
              </Badge>
            ) : null}
          </Link>

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
