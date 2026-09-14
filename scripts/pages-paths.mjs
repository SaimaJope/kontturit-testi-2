import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

// Content keeps its original URLs. Project-site prefixes belong to the build,
// so local editing and a later custom domain can use the same content files.
export function pagesPaths(base, origin) {
  const prefix = base.replace(/\/$/, '');
  const local = value => value.startsWith('/') && !value.startsWith('//') &&
    value !== prefix && !value.startsWith(prefix + '/')
    ? prefix + value : value;
  const absolute = value => {
    if (typeof value !== 'string' || !value.startsWith(origin + '/')) return value;
    const url = new URL(value);
    url.pathname = local(url.pathname);
    return url.href;
  };
  const rewriteData = value => typeof value === 'string' ? absolute(value)
    : Array.isArray(value) ? value.map(rewriteData)
    : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k,v]) => [k,rewriteData(v)])) : value;
  return {
    name: 'kontturi-project-paths',
    hooks: {
      'astro:build:done': async ({dir}) => {
        if (!prefix) return;
        async function walk(folder) {
          for (const entry of await fs.readdir(folder, {withFileTypes:true})) {
            const file = path.join(folder, entry.name);
            if (entry.isDirectory()) { await walk(file); continue; }
            if (entry.name.endsWith('.html')) {
              const $ = load(await fs.readFile(file, 'utf8'));
              for (const attr of ['href','src','action','poster']) {
                for (const element of $('['+attr+']').toArray()) {
                  const node = $(element); const value = node.attr(attr);
                  node.attr(attr, local(absolute(value)));
                }
              }
              $('meta[property="og:url"]').each((_,el) => $(el).attr('content', absolute($(el).attr('content'))));
              $('script[type="application/ld+json"]').each((_,el) => {
                $(el).text(JSON.stringify(rewriteData(JSON.parse($(el).text()))).replaceAll('<','\\u003c'));
              });
              await fs.writeFile(file, $.html());
            } else if (entry.name === 'sitemap.xml') {
              const xml = await fs.readFile(file,'utf8');
              await fs.writeFile(file, xml.replace(/<loc>(.*?)<\/loc>/g, (_,url) => `<loc>${absolute(url)}</loc>`));
            }
          }
        }
        await walk(fileURLToPath(dir));
      }
    }
  };
}
