import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "./db";
import { cartItems, products } from "./schema";

export const CART_COOKIE = "cartId";

/** Reads the cart id from the cookie without creating one (safe in pages/layouts). */
export async function getCartId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value;
}

export type CartLine = {
  productId: number;
  name: string;
  slug: string;
  imageUrl: string;
  priceCents: number;
  quantity: number;
  stock: number;
  lineTotalCents: number;
};

/** Returns the current cart's line items joined with product details. */
export async function getCartLines(): Promise<CartLine[]> {
  const cartId = await getCartId();
  if (!cartId) return [];

  const rows = await db
    .select({
      productId: products.id,
      name: products.name,
      slug: products.slug,
      imageUrl: products.imageUrl,
      priceCents: products.priceCents,
      stock: products.stock,
      quantity: cartItems.quantity,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cartId))
    .orderBy(cartItems.createdAt);

  return rows.map((row) => ({
    ...row,
    lineTotalCents: row.priceCents * row.quantity,
  }));
}

/** Total item count across the cart, for the header badge. */
export async function getCartCount(): Promise<number> {
  const lines = await getCartLines();
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}
