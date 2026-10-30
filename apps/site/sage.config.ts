import { defineSageConfig } from "astro-sage";

export default defineSageConfig({
  site: {
    url: "https://taannaayyy.github.io/",
    title: "Tanay Alpkonur",
    description:
      "ML / AI engineering: projects and technical writing on LLMs, NLP, computer vision and ML in finance.",
    author: "Tanay Alpkonur",
    profile: "https://github.com/taannaayyy",
    lang: "en",
    timezone: "Europe/Istanbul",
    dir: "ltr",
  },
  typography: { serif: "newsreader", opticalSizing: true },
  home: {
    title: "Tanay Alpkonur",
    intro:
      "I build machine learning systems and write about what I learn along the way: LLMs, NLP, computer vision and ML in finance.",
  },
  // Giscus is set up in build step 6.
  comments: { provider: false },
  posts: { perPage: 8, perIndex: 6, scheduledPostMargin: 15 * 60 * 1000 },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: false,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/taannaayyy" },
    { name: "linkedin", url: "https://linkedin.com/in/tanay-alpkonur" },
    { name: "mail", url: "mailto:taalpkonur@gmail.com" },
  ],
  // shareLinks: defaults to X, LinkedIn, Bluesky, Reddit, Hacker News and email.
});
