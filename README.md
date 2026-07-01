# Shopify Lite · فروشگاه لایت

A small, fast, fully right-to-left (RTL) e-commerce storefront built on the modern Next.js App Router. It ships a complete shopping flow — browse catalog, add to cart, sign in, check out — backed by a serverless Postgres database and React Server Components throughout.

The UI is in Persian (Farsi) and the layout is RTL end to end, including a Google Fonts-powered Persian web font self-hosted by Next.js and a localized authentication experience.

---

## Features

- 🛍️ **Product catalog** — server-rendered listing and per-product detail pages (`/`, `/products/[slug]`).
- 🛒 **Persistent cart** — backed by Postgres, identified by an opaque `httpOnly` cookie so it survives across visits without requiring a login.
- 🔐 **Authentication** — email/OTP sign-in via [Clerk](https://clerk.com), localized to Persian (`faIR`) with an LTR-corrected OTP field.
- 💳 **Checkout** — authenticated checkout that snapshots line items, records the order, decrements stock, and clears the cart.
- 📦 **Order history** — order confirmation and detail pages (`/orders/[id]`).
- 🌐 **Static pages** — About and Contact (with a contact form).
- ✨ **Polished UX** — page transitions and fade-in animations via Framer Motion, toast notifications via Sonner, and a [shadcn](https://ui.shadcn.com)/Tailwind component system.
- 🇮🇷 **First-class RTL** — `dir="rtl"`, Vazirmatn font via `next/font/google`, and prices in Toman.

## Tech Stack

| Layer            | Choice                                                        |
| ---------------- | ------------------------------------------------------------- |
| Framework        | [Next.js 16](https://nextjs.org) (App Router, Server Actions) |
| UI               | [React 19](https://react.dev)                                 |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com) + shadcn / Base UI |
| Animation        | [Framer Motion](https://www.framer.com/motion/)               |
| Database         | [Neon](https://neon.tech) serverless Postgres                 |
| ORM              | [Drizzle ORM](https://orm.drizzle.team)                       |
| Auth             | [Clerk](https://clerk.com)                                    |
| Toasts           | [Sonner](https://sonner.emilkowal.ski)                        |
| Package manager  | [Bun](https://bun.sh)                                         |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (used for installs, scripts, and seeding)
- A [Neon](https://neon.tech) (or any Postgres) database connection string
- A [Clerk](https://clerk.com) application (publishable + secret keys)

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

Create a `.env.local` file in the project root:

```bash
# Postgres connection string (Neon recommended)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Clerk keys (from your Clerk dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### 3. Set up the database

Push the Drizzle schema and seed it with sample products:

```bash
bun run db:push   # create tables from lib/schema.ts
bun run db:seed   # insert sample products
```

### 4. Run the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `bun run dev`      | Start the development server                 |
| `bun run build`    | Build for production                         |
| `bun run start`    | Start the production server                  |
| `bun run lint`     | Run ESLint                                   |
| `bun run db:push`  | Push the Drizzle schema to the database      |
| `bun run db:seed`  | Seed the database with sample products       |
| `bun run db:studio`| Open Drizzle Studio to inspect the database  |

## Project Structure

```
app/                  App Router pages & layouts
├── page.tsx          Storefront home (product grid)
├── products/[slug]/  Product detail
├── cart/             Cart page
├── orders/[id]/      Order confirmation/detail
├── about, contact/   Static pages
├── layout.tsx        Root layout (RTL, fonts, Clerk, Header/Footer)
└── loading.tsx       Route-level loading UI

components/           UI components (Header, ProductCard, forms, motion, shadcn/ui)
lib/
├── schema.ts         Drizzle table definitions
├── db.ts             Neon + Drizzle client
├── cart.ts           Cart read helpers (cookie-based)
├── actions.ts        Server Actions (addToCart, checkout, …)
└── format.ts, utils.ts

scripts/seed.ts       Sample-data seeder
proxy.ts              Clerk middleware (Next.js 16 "proxy")
drizzle.config.ts     Drizzle Kit config
```

## Data Model

Four tables defined in `lib/schema.ts`:

- **products** — catalog items (name, slug, description, price, image, stock).
- **cart_items** — one row per `(cartId, productId)`; quantity increments on repeat adds. The `cartId` comes from an `httpOnly` cookie.
- **orders** — a completed purchase (cart id, email, total, status).
- **order_items** — line items that snapshot name and price at purchase time, so later catalog edits never rewrite order history.

> **Note on money:** prices are stored as integer **Toman** (no subunit) in the existing `*_cents` columns to avoid a migration.

## Architecture Notes

- **Server Actions everywhere.** Cart mutations and checkout (`lib/actions.ts`) run on the server. Authorization is enforced inside the action — `checkout()` requires a signed-in user — because Server Actions are reachable as direct POSTs.
- **Cookie-scoped carts.** A guest can fill a cart before authenticating; the cart is keyed by an opaque UUID cookie rather than a user id.
- **Neon HTTP driver.** Uses `neon-http`, which has no interactive transactions, so checkout writes run sequentially.
- **Next.js 16 conventions.** Middleware lives in `proxy.ts` (renamed from `middleware.ts` in Next 16). Refer to `node_modules/next/dist/docs/` before relying on older Next.js APIs.

## Deployment

This app deploys cleanly to [Vercel](https://vercel.com). Set the same environment variables (`DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) in your project settings, then run the production build:

```bash
bun run build && bun run start
```

## License

Private project — all rights reserved.
