"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);

    window.setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
      toast.success("the submist has been successfully");
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">نام و نام خانوادگی</Label>
        <Input id="name" name="name" placeholder="مثلاً سارا احمدی" required />
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
        <Label htmlFor="subject">موضوع</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="پیگیری سفارش یا همکاری"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">پیام</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="پیام خود را بنویسید…"
          className="min-h-32 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-fit"
      >
        <Send />
        {isSubmitting ? "در حال ارسال…" : "ارسال پیام"}
      </Button>
    </form>
  );
}
