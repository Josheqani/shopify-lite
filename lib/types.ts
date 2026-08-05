export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  stock: number;
  imageUrl: string | null;
  createdAt: string;
};

export type CartItem = {
  id: number;
  cartId: string;
  productId: number;
  quantity: number;
  createdAt: string;
};

export type Order = {
  id: number;
  cartId: string;
  email: string;
  totalCents: number;
  status: string;
  createdAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  name: string;
  priceCents: number;
  quantity: number;
};
