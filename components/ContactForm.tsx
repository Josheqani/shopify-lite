"use client";

import { Send } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { submitContactMessage } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitContactMessage(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("پیام شما با موفقیت ارسال شد.");
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form.reset();
      }
    });
  }

  return (
    <form id="contact-form" action={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">نام و نام خانوادگی</Label>
        <Input id="name" name="name" placeholder="مثلاً سارا احمدی" required minLength={2} maxLength={120} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          dir="ltr"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">تلفن (اختیاری)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="۰۹۱۲۱۲۳۴۵۶۷"
          dir="ltr"
          minLength={7}
          maxLength={30}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">موضوع</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="پیگیری سفارش یا همکاری"
          required
          minLength={2}
          maxLength={200}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">پیام</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          placeholder="پیام خود را بنویسید…"
          className="min-h-32 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full sm:w-fit"
      >
        <Send />
        {isPending ? "در حال ارسال…" : "ارسال پیام"}
      </Button>
    </form>
  );
}
