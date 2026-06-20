import { readFileSync } from "node:fs";

import { defineConfig } from "drizzle-kit";

// drizzle-kit runs as its own process and does NOT auto-load .env.local the way
// the Next.js app and `bun run` do, so load DATABASE_URL from it explicitly.
function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const content = readFileSync(".env.local", "utf8");
    const match = content.match(/^\s*DATABASE_URL\s*=\s*(.*)\s*$/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    // fall through to the error below
  }
  throw new Error("DATABASE_URL not found in environment or .env.local");
}

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
