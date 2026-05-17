---
title: "Why I Migrated from Create React App to Vite (And You Should Too)"
date: "2024-03-15"
excerpt: "After years of tolerating slow cold starts and sluggish HMR, I finally made the switch. Here's what I learned migrating a 50,000-line React codebase from CRA to Vite."
coverImage: "/images/blog-1.jpg"
tags: ["React", "Vite", "Performance", "Developer Experience"]
---

## The Breaking Point

It started with a simple question from a new team member: "Why does it take 45 seconds to start the dev server?" I didn't have a good answer. We were running Create React App on a codebase that had grown to over 50,000 lines of TypeScript, and the developer experience had quietly degraded to the point where nobody wanted to restart the server.

Hot Module Replacement was taking 8–12 seconds on a modern MacBook Pro. Cold starts were worse. We'd normalized the pain, but the new hire's fresh perspective made it impossible to ignore. It was time to migrate to Vite.

## What Makes Vite Different

Vite takes a fundamentally different approach to development builds. Instead of bundling your entire application upfront (as webpack and CRA do), Vite serves source files over native ES modules. The browser requests only what it needs, and Vite transforms files on demand. This means cold start time is nearly constant regardless of application size — it doesn't matter if you have 100 modules or 10,000.

For production builds, Vite uses Rollup under the hood, which produces highly optimized output with excellent tree-shaking. The configuration API is clean and well-documented, and the plugin ecosystem has matured significantly over the past two years.

## The Migration Process

The actual migration was more straightforward than I expected. The key steps were: replacing `react-scripts` with `vite` and `@vitejs/plugin-react`, moving `index.html` from `public/` to the project root, updating environment variable prefixes from `REACT_APP_` to `VITE_`, and replacing `process.env` references with `import.meta.env`. We also took the opportunity to configure path aliases using `vite.config.ts` and `tsconfig.json`, which cleaned up a lot of deeply nested relative imports.

The entire migration took about half a day for our codebase. Cold start time dropped from 45 seconds to under 2 seconds. HMR went from 8–12 seconds to near-instant. The team noticed immediately, and morale around frontend development improved noticeably. If you're still on CRA, the migration is worth every minute it takes.
