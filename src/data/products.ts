export interface Product {
  id: string
  title: string
  description: string
  price: number // in toman
  image: string // emoji used as a lightweight placeholder
}

export const products: Product[] = [
  {
    id: "headphone",
    title: "هدفون بی‌سیم",
    description: "هدفون بلوتوثی با حذف نویز و باتری ۳۰ ساعته.",
    price: 1850000,
    image: "🎧",
  },
  {
    id: "watch",
    title: "ساعت هوشمند",
    description: "ساعت هوشمند با نمایشگر AMOLED و سنجش ضربان قلب.",
    price: 2400000,
    image: "⌚",
  },
  {
    id: "keyboard",
    title: "کیبورد مکانیکی",
    description: "کیبورد مکانیکی با نورپردازی RGB و سوییچ قرمز.",
    price: 1290000,
    image: "⌨️",
  },
  {
    id: "mouse",
    title: "ماوس گیمینگ",
    description: "ماوس گیمینگ با سنسور دقیق و ۷ دکمه قابل برنامه‌ریزی.",
    price: 690000,
    image: "🖱️",
  },
  {
    id: "camera",
    title: "دوربین بدون آینه",
    description: "دوربین جمع‌وجور با حسگر ۲۴ مگاپیکسلی و فیلم‌برداری ۴K.",
    price: 18900000,
    image: "📷",
  },
  {
    id: "speaker",
    title: "اسپیکر قابل حمل",
    description: "اسپیکر بلوتوثی ضدآب با صدای استریو قدرتمند.",
    price: 980000,
    image: "🔊",
  },
  {
    id: "phone",
    title: "گوشی هوشمند",
    description: "گوشی هوشمند با نمایشگر ۶.۵ اینچی و دوربین سه‌گانه.",
    price: 21500000,
    image: "📱",
  },
  {
    id: "console",
    title: "کنسول بازی",
    description: "کنسول بازی نسل جدید با گرافیک ۴K و SSD سریع.",
    price: 16700000,
    image: "🎮",
  },
]
