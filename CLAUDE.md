# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **Bun** as the package manager (`bun.lock`); use `bun install` to add dependencies.

- `bun run dev` — start the Vite dev server with HMR
- `bun run build` — type-check (`tsc -b`) and build for production into `dist/`
- `bun run lint` — run ESLint over the repo
- `bun run preview` — serve the production build locally

There is no test runner configured yet.

## Architecture

A single-page React 19 + TypeScript app built with Vite. Entry flow: `index.html` mounts `#root` → `src/main.tsx` (creates the React root in `StrictMode`) → `src/App.tsx` (the entire UI). There is no router, state library, or backend — all UI currently lives in `App.tsx` with styling split between `src/index.css` (global) and `src/App.css` (component).

Static assets in `src/assets/` are imported as modules (e.g. `import heroImg from './assets/hero.png'`), while files in `public/` are served from the root (e.g. `<use href="/icons.svg#...">` references the SVG sprite at `public/icons.svg`).

## TypeScript config

`tsconfig.json` is a solution file referencing `tsconfig.app.json` (app code under `src/`) and `tsconfig.node.json` (Vite/build tooling). Edit the relevant referenced config rather than the root one.

## Notes

- The React Compiler is intentionally not enabled (see `README.md`).
- The repo name is `shopify-lite` but the codebase is still the default Vite starter UI.
