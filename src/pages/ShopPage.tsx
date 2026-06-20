import { LogOut, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { useAuth } from "@/context/auth"
import { useCart } from "@/context/cart"
import { products } from "@/data/products"
import { formatNumber, formatToman } from "@/lib/format"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ShopPage() {
  const { user, logout } = useAuth()
  const { items, count, total, addItem, removeItem, clear } = useCart()

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-6" />
            <span className="text-lg font-semibold">فروشگاه لایت</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              سلام، {user?.name}
            </span>
            <span className="flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium">
              <ShoppingCart className="size-4" />
              {formatNumber(count)}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="size-4" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <section>
          <h1 className="mb-4 text-xl font-semibold">محصولات</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="justify-between">
                <CardHeader>
                  <div
                    className="mb-1 flex h-24 items-center justify-center rounded-lg bg-muted text-5xl"
                    aria-hidden="true"
                  >
                    {product.image}
                  </div>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <span className="font-semibold">
                    {formatToman(product.price)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                      })
                    }
                  >
                    <Plus className="size-4" />
                    افزودن
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>سبد خرید</CardTitle>
              <CardDescription>
                {count > 0
                  ? `${formatNumber(count)} کالا در سبد شما`
                  : "سبد خرید شما خالی است"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(item.qty)} × {formatToman(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => removeItem(item.id)}
                      aria-label="کاهش"
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="w-5 text-center text-sm">
                      {formatNumber(item.qty)}
                    </span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() =>
                        addItem({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                        })
                      }
                      aria-label="افزایش"
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            {count > 0 && (
              <CardFooter className="flex-col items-stretch gap-3 border-t pt-6">
                <div className="flex items-center justify-between font-semibold">
                  <span>مجموع</span>
                  <span>{formatToman(total)}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clear}>
                  <Trash2 className="size-4" />
                  خالی کردن سبد
                </Button>
              </CardFooter>
            )}
          </Card>
        </aside>
      </main>
    </div>
  )
}
