"use client";

import { HubPop } from "hub-pop";
import { useEffect } from "react";

// hub-pop mounts a floating GitHub card straight into the DOM, so it has to run
// on the client. Config comes from NEXT_PUBLIC_ env vars (inlined at build time)
// rather than being hardcoded here.
export function HubPopWidget() {
  useEffect(() => {
    const name = process.env.NEXT_PUBLIC_HUBPOP_NAME;
    const github = process.env.NEXT_PUBLIC_HUBPOP_GITHUB;

    // Both are required by hub-pop; skip mounting if either is missing.
    if (!name || !github) return;

    const widget = HubPop({
      name,
      github,
      website: process.env.NEXT_PUBLIC_HUBPOP_WEBSITE,
      position: "bottom-right",
      theme: "dark",
    });

    return () => widget.destroy();
  }, []);

  return null;
}
