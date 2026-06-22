import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباطی با فروشگاه لایت و فرم تماس نمایشی.",
};

const contactMethods = [
  { label: "ایمیل", value: "support@shopify-lite.test", icon: Mail },
  { label: "تلفن", value: "۰۲۱-۹۱۰۰-۲۴۲۴", icon: Phone },
  { label: "آدرس", value: "تهران، خیابان ولیعصر، پلاک ۲۴", icon: MapPin },
];

export default function ContactPage() {
  return (
    <FadeIn>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col gap-4">
          <span className="text-sm font-medium text-primary">تماس با ما</span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            خوشحال می‌شویم از شما بشنویم
          </h1>
          <p className="leading-8 text-muted-foreground">
            برای پرسش درباره محصولات، وضعیت سفارش، همکاری یا پیشنهادهای شما، فرم روبه‌رو را تکمیل کنید. این فرم داده‌ای ذخیره نمی‌کند و فقط یک اعلان موفقیت نمایش می‌دهد.
          </p>

          <div className="grid gap-3 pt-2">
            {contactMethods.map((method) => (
              <Card key={method.label}>
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <method.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{method.label}</p>
                    <p className="font-medium">{method.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>فرم تماس</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
}
