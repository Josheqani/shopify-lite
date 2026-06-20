"use client";

import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { checkout } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export function CheckoutForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleCheckout() {
    // The order is placed for the signed-in user; their email comes from Clerk.
    startTransition(() => {
      toast.promise(
        checkout().then((res) => {
          if ("error" in res) throw new Error(res.error);
          return res;
        }),
        {
          loading: "در حال ثبت سفارش…",
          success: (res) => {
            router.push(`/orders/${res.orderId}`);
            return "سفارش شما با موفقیت ثبت شد";
          },
          error: (e) =>
            e instanceof Error ? e.message : "ثبت سفارش ناموفق بود",
        },
      );
    });
  }

  return (
    <Button
      type="button"
      size="lg"
      className="w-full"
      disabled={isPending}
      onClick={handleCheckout}
    >
      <CreditCard />
      تکمیل خرید
    </Button>
  );
}
