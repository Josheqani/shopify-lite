"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { CART_COOKIE, getCartLines } from "./cart";
import { api, getAuthApi } from "./api";

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

  await api.post(`/cart/${cartId}/items`, { productId });

  revalidatePath("/");
  revalidatePath("/cart");
}

export async function setQuantity(productId: number, quantity: number) {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) return;

  if (quantity <= 0) {
    await api.delete(`/cart/${cartId}/items/${productId}`);
  } else {
    await api.patch(`/cart/${cartId}/items/${productId}`, { quantity });
  }

  revalidatePath("/cart");
  revalidatePath("/");
}

export async function removeFromCart(productId: number) {
  await setQuantity(productId, 0);
}

export async function checkout(): Promise<
  { orderId: number } | { error: string }
> {
  const { userId } = await auth();
  console.log("Checkout: userId =", userId);
  if (!userId) {
    return { error: "برای تکمیل خرید باید وارد شوید." };
  }

  const user = await currentUser();
  const email =
    user?.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user?.emailAddresses[0]?.emailAddress;
  console.log("Checkout: email =", email);
  if (!email) {
    return { error: "ایمیلی برای حساب شما یافت نشد." };
  }

  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  console.log("Checkout: cartId =", cartId);
  if (!cartId) {
    return { error: "سبد خرید شما خالی است." };
  }

  const lines = await getCartLines();
  console.log("Checkout: lines count =", lines.length);
  if (lines.length === 0) {
    return { error: "سبد خرید شما خالی است." };
  }

  try {
    const authApi = await getAuthApi();
    const { data: res } = await authApi.post("/checkout", { cartId });

    revalidatePath("/");
    revalidatePath("/cart");
    return { orderId: res.data.orderId };
  } catch (error: any) {
    console.error("Checkout failed:", error?.response?.status, error?.response?.data || error?.message);
    return { error: "خطا در ثبت سفارش" };
  }
}

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string || null;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    await api.post("/messages", {
      name,
      email,
      phone,
      subject,
      message,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact message", error);
    return { error: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید." };
  }
}
