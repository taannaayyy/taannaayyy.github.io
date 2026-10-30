import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { defineSageCollections } from "astro-sage/content";
import config from "../sage.config";

// Project drafts; the site has no Projects pages at the moment.
const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences for cards and meta tags. */
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    /** space: embedded Hugging Face Space · video: video or GIF · link: repo / notebook link */
    demoType: z.enum(["space", "video", "link"]).optional(),
    featured: z.boolean().default(false),
    /** Lower comes first in the project grid. */
    order: z.number().default(100),
    /** Drafts are never built. */
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  ...defineSageCollections({ author: config.site.author }),
  projects,
};
