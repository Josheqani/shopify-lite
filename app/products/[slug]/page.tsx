import { eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { products } from "@/lib/schema";
import { AddToCartButton } from "@/components/AddToCartButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/badge";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const outOfStock = product.stock <= 0;

  return (
    <FadeIn>
      <div className="flex flex-col gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="size-4" /> بازگشت به فروشگاه
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold">
                {formatPrice(product.priceCents)}
              </p>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div>
              {outOfStock ? (
                <Badge variant="secondary">ناموجود</Badge>
              ) : (
                <Badge variant="outline">{product.stock} عدد موجود</Badge>
              )}
            </div>

            <div className="pt-2">
              <AddToCartButton
                productId={product.id}
                disabled={outOfStock}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
