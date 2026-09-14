import { readFileSync } from 'node:fs';

// Keystatic 0.6.9 assumes /keystatic at the origin root. Adapt only its client
// navigation paths for the GitHub Pages project prefix, without changing auth.
export function editorBasePlugin(base) {
  const prefix = base.replace(/\/$/, '');
  return {
    name: 'kontturi-keystatic-base',
    enforce: 'pre',
    apply: 'build',
    buildStart() {
      const installed = JSON.parse(readFileSync(new URL('../node_modules/@keystatic/core/package.json', import.meta.url), 'utf8'));
      if (installed.version !== '0.6.9') throw new Error('Review the editor base-path adapter before upgrading Keystatic.');
    },
    transform(code, id) {
      if (!prefix || !id.replaceAll('\\','/').includes('/@keystatic/core/dist/') || !id.endsWith('.js')) return;
      const transformed = code
        .replace(/(["'`])\/keystatic(?=[/"'`?$])/g, (_,quote) => quote + prefix + '/keystatic')
        .replaceAll('${window.location.origin}/keystatic', '${window.location.origin}' + prefix + '/keystatic')
        .replaceAll('^\\/keystatic', '^' + prefix.replaceAll('/', '\\/') + '\\/keystatic');
      if (transformed !== code) return { code: transformed, map: null };
    }
  };
}

export function cloudEditor(base) {
  return {
    name: 'kontturi-cloud-editor',
    hooks: {
      'astro:config:setup': ({injectRoute, updateConfig}) => {
        injectRoute({pattern:'/keystatic/[...params]',entrypoint:'./src/editor/EditorPage.astro',prerender:true});
        updateConfig({vite:{plugins:[editorBasePlugin(base)]}});
      }
    }
  };
}
