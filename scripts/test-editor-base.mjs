import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { editorBasePlugin } from './cloud-editor.mjs';

const plugin = editorBasePlugin('/kontturit-testi-2');
plugin.buildStart();
const folder = 'node_modules/@keystatic/core/dist';
const routerFile = fs.readdirSync(folder).find(name => name.endsWith('.js') && fs.readFileSync(`${folder}/${name}`, 'utf8').includes('function RouterProvider('));
assert.ok(routerFile, 'Keystatic client router must be available for compatibility checks');
const id = `${folder}/${routerFile}`;
const original = fs.readFileSync(id, 'utf8');
const result = plugin.transform(original, '/project/'+id).code;
assert.ok(result.includes('startsWith("/kontturit-testi-2/keystatic")'));
assert.ok(result.includes('${window.location.origin}/kontturit-testi-2/keystatic/cloud/oauth/callback'));
assert.ok(result.includes("basePath: '/kontturit-testi-2/keystatic'"));
assert.ok(!result.includes('pathname.replace(/^\\/keystatic'));
assert.equal(plugin.transform(original,'/project/src/unrelated.js'), undefined);
const regexText = result.match(/pathname\.replace\((\/.*?\/), ""\)/)[1];
const routerRegex = new Function('return '+regexText)();
assert.equal('/kontturit-testi-2/keystatic/branch/main/collection/news'.replace(routerRegex,''),'branch/main/collection/news');
assert.ok(result.includes('https://keystatic.cloud/'));
const editorPage = fs.readFileSync('src/editor/EditorPage.astro', 'utf8');
const bootstrap = editorPage.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function restoredPath(path) {
  const location = new URL(path, 'https://saimajope.github.io');
  vm.runInNewContext(bootstrap, {
    URL, URLSearchParams, location,
    document: {body: {dataset: {editorBase: '/kontturit-testi-2/keystatic'}}},
    history: {replaceState(_state, _title, path) { location.href = new URL(path, location.origin).href; }},
  });
  return location.pathname + location.search + location.hash;
}
assert.equal(restoredPath('/kontturit-testi-2/keystatic/cloud/oauth/callback/?code=test&state=test'), '/kontturit-testi-2/keystatic/cloud/oauth/callback?code=test&state=test');
assert.equal(restoredPath('/kontturit-testi-2/keystatic/?editorPath='+encodeURIComponent('/kontturit-testi-2/keystatic/branch/main/collection/news/')), '/kontturit-testi-2/keystatic/branch/main/collection/news');
assert.equal(restoredPath('/kontturit-testi-2/keystatic/?editorPath='+encodeURIComponent('https://example.com/steal')), '/kontturit-testi-2/keystatic?editorPath='+encodeURIComponent('https://example.com/steal'));
console.log('Keystatic project-path and OAuth callback compatibility checks passed.');
