import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://braydev.xyz',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always'
  },
});