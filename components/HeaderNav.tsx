"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "صفحه اصلی", exact: true },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

function isActivePath(pathname: string, href: string, exact = false) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const menuItemClassName =
  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted";
const activeMenuItemClassName =
  "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90";

export function HeaderNav({ cartCount }: { cartCount: number }) {
  const pathname = usePathname();
  const isCartActive = isActivePath(pathname, "/cart");

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex" aria-label="منوی اصلی">
        {navItems.map((item) => {
          const isActive = isActivePath(pathname, item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                menuItemClassName,
                isActive && activeMenuItemClassName
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/cart"
        aria-current={isCartActive ? "page" : undefined}
        className={cn(
          "relative inline-flex items-center gap-2",
          menuItemClassName,
          isCartActive && activeMenuItemClassName
        )}
      >
        <ShoppingCart className="size-5" />
        <span className="hidden sm:inline">سبد خرید</span>
        {cartCount > 0 ? (
          <Badge className="absolute -top-1 -right-1 size-5 justify-center rounded-full p-0 tabular-nums">
            {cartCount}
          </Badge>
        ) : null}
      </Link>
    </>
  );
}
