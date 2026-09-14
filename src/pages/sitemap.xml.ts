import type { APIRoute } from 'astro';
import {getCollection} from 'astro:content';
export const GET: APIRoute = async ({site}) => {
 const entries=(await Promise.all((['services','people','offices','news','pages'] as const).map(c=>getCollection(c)))).flat();
 const routes=new Set(['/',...entries.map(e=>e.data.route)]);
 const total=entries.filter(e=>e.data.type==='news').length;
 for(let p=2;p<=Math.ceil(total/9);p++)routes.add(`/uutiset/sivu/${p}`);
 const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...routes].sort().map(route=>`<url><loc>${new URL(route,site).href.replaceAll('&','&amp;')}</loc></url>`).join('')}</urlset>`;
 return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
