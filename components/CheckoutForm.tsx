"use client";

import { CreditCard } from "lucide-react";
import { useFormStatus } from "react-dom";

import { checkout } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      <CreditCard />
      {pending ? "در حال ثبت سفارش…" : "تکمیل خرید"}
    </Button>
  );
}

export function CheckoutForm() {
  return (
    <form action={checkout} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="ایمیل خود را وارد کنید"
          autoComplete="email"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
