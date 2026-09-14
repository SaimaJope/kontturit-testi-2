import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import { loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  site: process.env.SITE_ORIGIN || env.SITE_ORIGIN || 'https://kontturi.fi',
  output: 'static',
  integrations: [react(), markdoc(), ...(process.env.NODE_ENV !== 'production' ? [keystatic()] : [])],
  server: { host: '127.0.0.1', port: 4321 },
  devToolbar: { enabled: false },
  vite: { cacheDir: process.env.NODE_ENV === 'production' ? 'node_modules/.vite-build' : 'node_modules/.vite-dev' },
});
