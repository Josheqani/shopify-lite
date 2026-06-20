import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed "Middleware" to "Proxy" (this file used to be middleware.ts).
// Clerk's clerkMiddleware() is runtime-compatible and is exported as the default
// proxy handler. With no route matchers passed, all routes stay public — Clerk
// auth is simply made available; nothing is force-protected.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Run on everything except Next.js internals and static files,
    // unless they appear in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
