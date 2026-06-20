import { useEffect, useMemo, useState, type ReactNode } from "react"
import { CartContext, type CartItem } from "./cart"
import { getItem, setItem, storageKeys } from "@/lib/storage"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    getItem<CartItem[]>(storageKeys.cart, [])
  )

  // Persist the cart on every change.
  useEffect(() => {
    setItem(storageKeys.cart, items)
  }, [items])

  function addItem(product: { id: string; title: string; price: number }) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeItem(id: string) {
    // Decrement quantity; drop the line when it reaches zero.
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  function clear() {
    setItems([])
  }

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  )
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, count, total, addItem, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}
