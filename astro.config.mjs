// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Needed so Astro.site can build the absolute URLs that Open Graph requires.
  site: 'https://dauphinsss.vercel.app',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
