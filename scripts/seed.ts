/**
 * Seeds the storefront with sample products.
 * Run with: bun run db:seed  (Bun auto-loads .env.local)
 */
import { db } from "../lib/db";
import { cartItems, orderItems, orders, products } from "../lib/schema";

const SAMPLE_PRODUCTS = [
  {
    name: "هدفون بی‌سیم آورا",
    slug: "aurora-wireless-headphones",
    description:
      "هدفون روگوشی با نویزگیر فعال و باتری ۴۰ ساعته.",
    priceCents: 4900000,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    stock: 25,
  },
  {
    name: "ماگ سرامیکی ترا",
    slug: "terra-ceramic-mug",
    description:
      "ماگ سفالی دست‌ساز ۳۵۰ میلی‌لیتری. مناسب ماکروویو و ماشین ظرف‌شویی.",
    priceCents: 320000,
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    stock: 120,
  },
  {
    name: "کوله‌پشتی کتان دریفت",
    slug: "drift-canvas-backpack",
    description:
      "کوله‌پشتی کتان ۲۲ لیتری ضدآب با جای لپ‌تاپ بالشتک‌دار.",
    priceCents: 1850000,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    stock: 40,
  },
  {
    name: "چراغ مطالعه لومن",
    slug: "lumen-desk-lamp",
    description:
      "چراغ رومیزی ال‌ای‌دی با نور و دمای رنگ قابل تنظیم و درگاه USB-C.",
    priceCents: 980000,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    stock: 60,
  },
  {
    name: "قمقمه استیل نومد",
    slug: "nomad-stainless-bottle",
    description:
      "قمقمه دوجداره ۷۵۰ میلی‌لیتری. ۲۴ ساعت سرد و ۱۲ ساعت گرم نگه می‌دارد.",
    priceCents: 650000,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    stock: 200,
  },
  {
    name: "دفترچه جیبی فیلد نوتس",
    slug: "field-notes-notebook",
    description: "مجموعه سه‌عددی دفترچه جیبی با کاغذ بازیافتی نقطه‌چین.",
    priceCents: 240000,
    imageUrl:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80",
    stock: 300,
  },
  {
    name: "کیبورد مکانیکی پالس",
    slug: "pulse-mechanical-keyboard",
    description:
      "کیبورد مکانیکی ۷۵٪ با سوییچ‌های تعویض‌پذیر و نورپردازی RGB.",
    priceCents: 3200000,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    stock: 35,
  },
  {
    name: "روانداز کتان کاو",
    slug: "cove-linen-throw",
    description:
      "روانداز کتانی نرم و سنگ‌شور، ۱۲۷×۱۵۲ سانتی‌متر. مناسب شب‌های دنج.",
    priceCents: 1400000,
    imageUrl:
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=800&q=80",
    stock: 50,
  },
];

async function main() {
  console.log("Clearing existing data...");
  // Order matters: children before parents (FK constraints).
  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(cartItems);
  await db.delete(products);

  console.log(`Inserting ${SAMPLE_PRODUCTS.length} products...`);
  await db.insert(products).values(SAMPLE_PRODUCTS);

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
