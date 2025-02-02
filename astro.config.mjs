import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), icon(), mdx()],
  adapter: vercel({
    webAnalytics: {
      enabled: true, // set to false when using @vercel/analytics@1.4.0
    },
  }),
});