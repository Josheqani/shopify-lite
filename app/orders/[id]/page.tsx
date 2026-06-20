import { eq } from "drizzle-orm";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { orderItems, orders } from "@/lib/schema";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "سفارش ثبت شد",
};

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isInteger(orderId)) notFound();

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);
  if (!order) notFound();

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  return (
    <FadeIn>
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="size-12 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight">
            از خرید شما متشکریم!
          </h1>
          <p className="text-muted-foreground">
            سفارش #{order.id} ثبت شد. رسید به {order.email} ارسال شد.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>خلاصه سفارش</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-muted-foreground">×{item.quantity}</span>
                </span>
                <span className="tabular-nums">
                  {formatPrice(item.priceCents * item.quantity)}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>مجموع</span>
              <span className="tabular-nums">
                {formatPrice(order.totalCents)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          ادامه خرید
        </Link>
      </div>
    </FadeIn>
  );
}
