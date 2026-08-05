import "server-only";

import { cookies } from "next/headers";
import { api } from "./api";

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

  try {
    const { data: res } = await api.get(`/cart/${cartId}`);
    return res.data.lines;
  } catch {
    return [];
  }
}

/** Total item count across the cart, for the header badge. */
export async function getCartCount(): Promise<number> {
  const lines = await getCartLines();
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}
