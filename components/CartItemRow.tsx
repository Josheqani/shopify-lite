"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

import { removeFromCart, setQuantity } from "@/lib/actions";
import type { CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function CartItemRow({ line }: { line: CartLine }) {
  const [isPending, startTransition] = useTransition();

  function changeQuantity(next: number) {
    startTransition(async () => {
      await setQuantity(line.productId, next);
    });
  }

  function remove() {
    startTransition(async () => {
      await removeFromCart(line.productId);
    });
  }

  return (
    <div
      className="flex items-center gap-4 py-4"
      data-pending={isPending ? "" : undefined}
    >
      <Link
        href={`/products/${line.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10"
      >
        {line.imageUrl ? (
          <Image
            src={line.imageUrl}
            alt={line.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link href={`/products/${line.slug}`} className="font-medium hover:underline">
          {line.name}
        </Link>
        <span className="text-sm text-muted-foreground">
          قیمت واحد: {formatPrice(line.priceCents)}
        </span>
        <div className="mt-1 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isPending}
            onClick={() => changeQuantity(line.quantity - 1)}
            aria-label="کاهش تعداد"
          >
            <Minus />
          </Button>
          <span className="w-6 text-center text-sm tabular-nums">
            {line.quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isPending || line.quantity >= line.stock}
            onClick={() => changeQuantity(line.quantity + 1)}
            aria-label="افزایش تعداد"
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="font-semibold tabular-nums">
          {formatPrice(line.lineTotalCents)}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={isPending}
          onClick={remove}
          aria-label="حذف کالا"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
