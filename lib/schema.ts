import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Storefront catalog. Prices are stored as integer Toman (no subunit), kept in
// the existing *_cents columns to avoid a schema migration.
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  stock: integer("stock").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// A cart is identified by an opaque id stored in an httpOnly cookie. One row per
// (cart, product); quantity is bumped on repeat "add to cart".
export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cartId: text("cart_id").notNull(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("cart_items_cart_product_idx").on(
      table.cartId,
      table.productId,
    ),
  ],
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  cartId: text("cart_id").notNull(),
  email: text("email").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text("status").notNull().default("paid"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Line items snapshot name/price at purchase time so later catalog edits don't
// rewrite order history.
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  name: text("name").notNull(),
  priceCents: integer("price_cents").notNull(),
  quantity: integer("quantity").notNull(),
});

export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
