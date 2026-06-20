import { ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { getCartLines } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { CartItemRow } from "@/components/CartItemRow";
import { CheckoutForm } from "@/components/CheckoutForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "سبد خرید",
};

export default async function CartPage() {
  const lines = await getCartLines();
  const totalCents = lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (lines.length === 0) {
    return (
      <FadeIn>
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <ShoppingBag className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-semibold">سبد خرید شما خالی است</h1>
          <p className="text-muted-foreground">
            مجموعه را ببینید و محصول موردعلاقه‌تان را اضافه کنید.
          </p>
          <Link href="/" className={buttonVariants()}>
            ادامه خرید
          </Link>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">سبد خرید</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <Card>
            <CardContent className="divide-y">
              {lines.map((line) => (
                <CartItemRow key={line.productId} line={line} />
              ))}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  جمع جزء ({itemCount} {itemCount === 1 ? "کالا" : "کالا"})
                </span>
                <span className="tabular-nums">{formatPrice(totalCents)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ارسال</span>
                <span>رایگان</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>مجموع</span>
                <span className="tabular-nums">{formatPrice(totalCents)}</span>
              </div>
              <CheckoutForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </FadeIn>
  );
}
