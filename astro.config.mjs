import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "https://www.prandogabriel.dev",
  output: "server",
  integrations: [
    tailwind(),
    icon(),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    envPrefix: ['TELEGRAM_'],
  },
  adapter: vercel(),
});