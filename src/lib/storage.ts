// Small typed wrappers around localStorage with namespaced keys.
const PREFIX = "shopify-lite"

export const storageKeys = {
  user: `${PREFIX}:user`,
  cart: `${PREFIX}:cart`,
} as const

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable (private mode / quota) — fail silently
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
