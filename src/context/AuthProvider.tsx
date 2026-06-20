import { useState, type ReactNode } from "react"
import { AuthContext, type User } from "./auth"
import { getItem, removeItem, setItem, storageKeys } from "@/lib/storage"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    getItem<User | null>(storageKeys.user, null)
  )

  function login({ email }: { email: string; password: string }) {
    // Login-only flow: trust the entered credentials and persist the user.
    // The password is used by the form but never stored.
    const name = email.split("@")[0] || email
    const next: User = { email, name }
    setUser(next)
    setItem(storageKeys.user, next)
  }

  function logout() {
    setUser(null)
    removeItem(storageKeys.user)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
