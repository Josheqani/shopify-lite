"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useState, useTransition } from "react";

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
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    startTransition(async () => {
      await addToCart(productId);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
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
      {justAdded ? (
        <>
          <Check /> افزوده شد
        </>
      ) : (
        <>
          <ShoppingCart /> {disabled ? "ناموجود" : "افزودن به سبد"}
        </>
      )}
    </Button>
  );
}
