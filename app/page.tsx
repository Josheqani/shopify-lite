import { api } from "@/lib/api";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default async function Home() {
  const { data: res } = await api.get("/products");
  const allProducts: Product[] = res.data;

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            مجموعه محصولات
          </h1>
          <p className="max-w-prose text-muted-foreground">
            کالاهای روزمره با دقت انتخاب‌شده. پرداخت سریع و بی‌دردسر.
          </p>
        </section>
      </FadeIn>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {allProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
