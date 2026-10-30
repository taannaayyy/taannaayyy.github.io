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
    title: "Hi, I’m Tanay Alpkonur",
    intro:
      "I’m a computer engineer working mainly on machine learning. I believe teaching is the best way to learn, so this site is where I share my notes along the way. Everything here is my own understanding, in my own words, mistakes and all. Even though I write my notes in English myself, it isn’t my first language, so I use AI to help with grammar and phrasing before sharing them here.",
  },
  nav: [
    { path: "/posts", label: "Posts" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ],
  // Home and About come from src/pages/ instead of the theme.
  routes: { exclude: ["/", "/about"] },
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
    {
      name: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/tanay-alpkonur",
    },
    { name: "github", label: "GitHub", url: "https://github.com/taannaayyy" },
    {
      name: "kaggle",
      label: "Kaggle",
      url: "https://www.kaggle.com/tanayalpkonur",
    },
    { name: "mail", label: "Mail", url: "mailto:taalpkonur@gmail.com" },
  ],
  // shareLinks: defaults to X, LinkedIn, Bluesky, Reddit, Hacker News and email.
});
