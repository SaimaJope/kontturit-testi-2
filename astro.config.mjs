import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import { loadEnv } from 'vite';
import { pagesPaths } from './scripts/pages-paths.mjs';
import { cloudEditor } from './scripts/cloud-editor.mjs';
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const site = process.env.SITE_ORIGIN || env.SITE_ORIGIN || 'https://kontturi.fi';
const base = process.env.SITE_BASE_PATH || env.SITE_BASE_PATH || '/';
const cloudProject = process.env.PUBLIC_KEYSTATIC_CLOUD_PROJECT || env.PUBLIC_KEYSTATIC_CLOUD_PROJECT;

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [react(), markdoc(), ...(process.env.NODE_ENV !== 'production' ? [keystatic()] : cloudProject ? [cloudEditor(base)] : []), pagesPaths(base, new URL(site).origin)],
  server: { host: '127.0.0.1', port: 4321 },
  devToolbar: { enabled: false },
  vite: { cacheDir: process.env.NODE_ENV === 'production' ? 'node_modules/.vite-build' : 'node_modules/.vite-dev' },
});
