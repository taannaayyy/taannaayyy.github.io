# taannaayyy.github.io

Personal website and technical blog of Tanay Alpkonur, live at https://taannaayyy.github.io.

Built with [Astro](https://astro.build) on the [AstroSage](https://github.com/chintak/astro-sage) theme, which is vendored in `packages/astro-sage` so it can be customised.

## Develop

Requires Node 22.12+ and pnpm (`corepack enable`).

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # writes apps/site/dist
```

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Where things live

| What | Where |
|---|---|
| Site settings (title, socials, home intro) | `apps/site/sage.config.ts` |
| Blog posts | `apps/site/src/content/posts/` |
| Projects | `apps/site/src/content/projects/<slug>/index.md` |
| About page | `apps/site/src/content/pages/about.md` |
| Theme (layouts, styles, routes) | `packages/astro-sage/src/` |
| Writing syntax (callouts, math, code, diagrams) | [FEATURES.md](FEATURES.md) |

Posts and projects with `draft: true` are never built.
