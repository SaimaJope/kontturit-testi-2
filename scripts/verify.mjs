import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
const failures=[];const warnings=[];const htmlFiles=[];
const base=(process.env.SITE_BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.name.endsWith('.html'))htmlFiles.push(p);}}
await walk('dist');
const routeOf=file=>'/'+path.relative('dist',file).replaceAll('\\','/').replace(/index\.html$/,'').replace(/\/$/,'');
const exists=async p=>{try{await fs.access(p);return true;}catch{return false;}};
const records=[];
for(const file of htmlFiles){
 const html=await fs.readFile(file,'utf8');const $=load(html);const route=routeOf(file)||'/';
 if($('h1').length!==1)failures.push({route,problem:`${$('h1').length} h1 headings`});
 if(!$('title').text()||!$('meta[name="description"]').attr('content'))failures.push({route,problem:'Missing title or description'});
 if($('html').attr('lang')!=='fi')failures.push({route,problem:'Missing Finnish language'});
 if(!$('main').text().trim())failures.push({route,problem:'Empty main'});
 for(const el of $('a[href],img[src],script[src],link[href]').toArray()){
  const node=$(el);const value=node.attr('href')||node.attr('src');if(!value||value.startsWith('data:'))continue;
  if(el.name!=='a'&&node.attr('rel')!=='canonical'&&/^https?:/.test(value))failures.push({route,problem:'Remote runtime asset',value});
  if(el.name==='a'&&value.startsWith('tel:')){
   const visible=node.text().replace(/[^\d+]/g,'');const target=value.slice(4).replace(/[^\d+]/g,'');
   const normalize=s=>s.replace(/^\+358/,'0');
   if(visible.length>=7&&normalize(visible)!==normalize(target))warnings.push({route,problem:'Phone label/target mismatch',visible,target});
  }
  if(!value.startsWith('/'))continue;
  const u=new URL(value,'http://local');
  if(base && u.pathname!==base && !u.pathname.startsWith(base+'/'))failures.push({route,problem:'Destination missing deployment base',value});
  const dest=decodeURIComponent(base && (u.pathname===base || u.pathname.startsWith(base+'/')) ? u.pathname.slice(base.length)||'/' : u.pathname);
  const valid=await exists(path.join('dist',dest))||await exists(path.join('dist',dest,'index.html'));
  if(!valid)failures.push({route,problem:'Broken local destination',value});
 }
 for(const el of $('script[type="application/ld+json"]').toArray()){try{JSON.parse($(el).text());}catch{failures.push({route,problem:'Invalid structured data'});}}
 for(const el of $('a[href^="#"]').toArray()){const id=$(el).attr('href').slice(1);if(id&&!$('[id]').toArray().some(e=>$(e).attr('id')===id))failures.push({route,problem:'Broken page anchor',id});}
 records.push({route,title:$('title').text(),description:$('meta[name="description"]').attr('content'),date:$('main time').first().attr('datetime'),mainCharacters:$('main').text().trim().length,images:$('main img').length});
}
const migration=JSON.parse(await fs.readFile('docs/migration-manifest.json','utf8'));
for(const p of migration.pages){if(!records.some(r=>r.route===p.route))failures.push({route:p.route,problem:'Unmigrated source page'});}
for(const key of ['title','description']){
 const seen=new Map();for(const r of records){if(seen.has(r[key]))warnings.push({route:r.route,problem:`Duplicate ${key}`,other:seen.get(r[key])});seen.set(r[key],r.route);}
}
for(const p of migration.pages){
 if(p.sourceDate&&records.find(r=>r.route===p.route)?.date!==p.sourceDate)failures.push({route:p.route,problem:'Article date changed'});
 if(p.sourceEmail&&p.email!==p.sourceEmail)failures.push({route:p.route,problem:'Staff email changed'});
 if(p.sourceRole&&p.role!==p.sourceRole)failures.push({route:p.route,problem:'Staff qualifications changed'});
}
if(await exists('dist/keystatic')||await exists('dist/api/keystatic'))failures.push({problem:'Local editor present in public build'});
const report={checkedAt:new Date().toISOString(),pages:records.length,migrated: migration.pages.length,failures,warnings,records};
await fs.mkdir('docs',{recursive:true});await fs.writeFile('docs/verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages,migrated:report.migrated,failures,warnings},null,2));
if(failures.length)process.exitCode=1;
