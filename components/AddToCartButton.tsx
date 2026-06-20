"use client";

import { ShoppingCart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { addToCart } from "@/lib/actions";
import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
  productId: number;
  disabled?: boolean;
  size?: "default" | "sm" | "lg";
  className?: string;
};

export function AddToCartButton({
  productId,
  disabled,
  size = "default",
  className,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      toast.promise(addToCart(productId), {
        loading: "در حال افزودن…",
        success: "به سبد خرید اضافه شد",
        error: "افزودن به سبد خرید ناموفق بود",
      });
    });
  }

  return (
    <Button
      type="button"
      size={size}
      disabled={disabled || isPending}
      onClick={handleClick}
      className={className}
    >
      <ShoppingCart /> {disabled ? "ناموجود" : "افزودن به سبد"}
    </Button>
  );
}
