"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/schema";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
  /** Position in the grid, used to stagger the entrance animation. */
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const outOfStock = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lg">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : null}
            {outOfStock ? (
              <Badge variant="secondary" className="absolute top-3 left-3">
                ناموجود
              </Badge>
            ) : null}
          </div>
        </Link>
        <CardContent className="flex flex-col gap-1">
          <Link
            href={`/products/${product.slug}`}
            className="font-medium leading-tight hover:underline"
          >
            {product.name}
          </Link>
          <span className="text-lg font-semibold">
            {formatPrice(product.priceCents)}
          </span>
        </CardContent>
        <CardFooter>
          <AddToCartButton
            productId={product.id}
            disabled={outOfStock}
            className="w-full"
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
