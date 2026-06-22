import { HeartHandshake, ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "آشنایی با فروشگاه لایت و ارزش‌های تجربه خرید ساده، سریع و قابل اعتماد.",
};

const values = [
  {
    title: "انتخاب دقیق",
    description:
      "محصولات فروشگاه با تمرکز روی کاربرد روزمره، کیفیت قابل قبول و طراحی تمیز انتخاب شده‌اند.",
    icon: Sparkles,
  },
  {
    title: "اعتماد در خرید",
    description:
      "اطلاعات قیمت، موجودی و جزئیات محصول شفاف نمایش داده می‌شود تا تصمیم‌گیری آسان باشد.",
    icon: ShieldCheck,
  },
  {
    title: "ارسال ساده",
    description:
      "روند خرید کوتاه و تجربه ارسال ساده طراحی شده تا مشتری با خیال راحت خرید کند.",
    icon: Truck,
  },
];

export default function AboutPage() {
  return (
    <FadeIn>
      <div className="flex flex-col gap-8">
        <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-10">
          <div className="flex max-w-3xl flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <HeartHandshake className="size-4" /> درباره فروشگاه لایت
            </span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              تجربه خریدی سبک، سریع و دوست‌داشتنی
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              فروشگاه لایت با تمرکز بر رابط کاربری ساده، محصولات معتبر و مسیر خرید بی‌دردسر ساخته شده است. هدف ما این است که مشتری در چند قدم کوتاه محصول موردنظرش را پیدا کند و با اطمینان خرید را کامل کند.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <Card key={item.title}>
              <CardHeader className="gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="leading-7 text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </FadeIn>
  );
}
