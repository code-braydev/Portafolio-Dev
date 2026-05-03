import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-braydev.xyz',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always'
  },
});