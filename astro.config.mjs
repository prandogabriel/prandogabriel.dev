import { defineConfig } from "astro/config";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.prandogabriel.dev",
  output: "server",
  integrations: [
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
    plugins: [tailwindcss()],
    envPrefix: ['TELEGRAM_'],
  },
  adapter: vercel(),
});
