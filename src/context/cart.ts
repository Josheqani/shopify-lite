import { createContext, useContext } from "react"

export interface CartItem {
  id: string
  title: string
  price: number
  qty: number
}

export interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  addItem: (product: { id: string; title: string; price: number }) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return ctx
}
