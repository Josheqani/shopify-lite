"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CART_COOKIE, getCartLines } from "./cart";
import { db } from "./db";
import { cartItems, orderItems, orders, products } from "./schema";

const CART_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Reads the cart id, creating and persisting one in a cookie if absent. */
async function getOrCreateCartId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  store.set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: CART_MAX_AGE,
  });
  return id;
}

export async function addToCart(productId: number) {
  const cartId = await getOrCreateCartId();

  await db
    .insert(cartItems)
    .values({ cartId, productId, quantity: 1 })
    .onConflictDoUpdate({
      target: [cartItems.cartId, cartItems.productId],
      set: { quantity: sql`${cartItems.quantity} + 1` },
    });

  revalidatePath("/");
  revalidatePath("/cart");
}

export async function setQuantity(productId: number, quantity: number) {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) return;

  if (quantity <= 0) {
    await db
      .delete(cartItems)
      .where(
        and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)),
      );
  } else {
    await db
      .update(cartItems)
      .set({ quantity })
      .where(
        and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)),
      );
  }

  revalidatePath("/cart");
  revalidatePath("/");
}

export async function removeFromCart(productId: number) {
  await setQuantity(productId, 0);
}

export async function checkout(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    throw new Error("Email is required to check out.");
  }

  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) redirect("/cart");

  const lines = await getCartLines();
  if (lines.length === 0) redirect("/cart");

  const totalCents = lines.reduce((sum, line) => sum + line.lineTotalCents, 0);

  // neon-http has no interactive transactions, so run the writes sequentially.
  const [order] = await db
    .insert(orders)
    .values({ cartId, email, totalCents, status: "paid" })
    .returning({ id: orders.id });

  await db.insert(orderItems).values(
    lines.map((line) => ({
      orderId: order.id,
      productId: line.productId,
      name: line.name,
      priceCents: line.priceCents,
      quantity: line.quantity,
    })),
  );

  // Decrement stock for each purchased product.
  for (const line of lines) {
    await db
      .update(products)
      .set({ stock: sql`greatest(${products.stock} - ${line.quantity}, 0)` })
      .where(eq(products.id, line.productId));
  }

  // Empty the cart.
  await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

  revalidatePath("/");
  revalidatePath("/cart");
  redirect(`/orders/${order.id}`);
}
