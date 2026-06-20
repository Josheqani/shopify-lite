import { createContext, useContext } from "react"

export interface User {
  email: string
  name: string
}

export interface AuthContextValue {
  user: User | null
  login: (data: { email: string; password: string }) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
