import { readFileSync } from 'node:fs';

export function editorUiPlugin() {
  return { name: 'kontturi-keystatic-ui', enforce: 'pre', apply: 'build', transform(code, id) {
    if (!id.replaceAll('\\','/').includes('/@keystatic/core/dist/') || !id.endsWith('.js')) return;
    let output = code.replace('colorScheme: themeContext.theme', 'colorScheme: "light"')
      .replace('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', 'data:text/css,')
      .replace('window.history[replace ? "replaceState" : "pushState"](null, "", newUrl);', 'window.history[replace ? "replaceState" : "pushState"](null, "", newUrl); window.dispatchEvent(new Event("kontturi:editor-route"));');
    // Keep stable item keys, but show human titles instead of filesystem slugs.
    output = output.replace("}]), {\n        name: 'Slug',\n        key: SLUG\n      }, ...collection.columns.map", "}]), ...collection.columns.map")
      .replace('...(hideStatusColumn ? [] : [statusCell]), nameCell, ...collection.columns.map', '...(hideStatusColumn ? [] : [statusCell]), ...collection.columns.map')
      .replace("column: SLUG,\n    direction: 'ascending'", "column: props.collection === 'news' ? 'date' : 'title',\n    direction: props.collection === 'news' ? 'descending' : 'ascending'")
      .replace('item.name.toLowerCase().includes(searchTerm.toLowerCase())', "[item.name, item.data?.title || ''].join(' ').toLocaleLowerCase('fi').includes(searchTerm.toLocaleLowerCase('fi'))")
      .replace('key: column\n        };', "key: column, ...(column === 'date' ? {name: 'Julkaistu', width: 130} : {})\n        };")
      .replace("val = val + '';", "val = column_0 === 'date' ? new Date(val).toLocaleDateString('fi-FI') : val + '';");
    output = output.replace(/"fi-FI": \{[\s\S]*?\n  \}/, block => block
      .replace('`Lisätä`','`Uusi`').replace('`Tühista`','`Peruuta`').replace('`Kirkas`','`Tyhjennä`')
      .replace('`Luoda`','`Julkaise`').replace('`Kojelauta`','`Aloitus`').replace('`Poistaa`','`Poista`')
      .replace('`Muokata`','`Muokkaa`').replace('`Tallentaa`','`Tallenna`'));
    const labels = { 'Choose file':'Valitse kuva', 'Remove':'Poista kuva', 'Reset changes':'Peru muutokset', 'Delete entry…':'Poista sisältö…', 'Duplicate entry…':'Luo kopio…', 'Log in with Keystatic Cloud':'Kirjaudu muokkaamaan', 'Saving changes':'Tallennetaan muutoksia', 'Text block':'Tekstin tyyli', 'Paragraph':'Kappale', 'Formatting options':'Tekstin muotoilu', 'Text formatting':'Muotoilu', 'Bold':'Lihavointi', 'Italic':'Kursivointi', 'Bullet list':'Luettelo', 'Numbered list':'Numeroitu luettelo', 'Heading 1':'Otsikko 1', 'Heading 2':'Otsikko 2', 'Heading 3':'Otsikko 3' };
    Object.assign(labels, {'Unsaved':'Tallentamatta', 'Reset':'Tyhjennä luonnos', 'Copy entry':'Kopioi sisältö', 'Paste entry':'Liitä sisältö', 'View on GitHub':'Näytä GitHubissa', 'No results':'Ei hakutuloksia', 'Clear formatting':'Poista muotoilu', 'Lists':'Luettelot', 'Blocks':'Sisältöelementit', 'Strikethrough':'Yliviivaus', 'Code':'Koodi', 'Divider':'Erotin', 'Quote':'Lainaus', 'Code block':'Koodilohko', 'Table':'Taulukko', 'Image':'Kuva', 'Sign out':'Kirjaudu ulos', 'Manage Account':'Oma tili', 'Open app navigation':'Avaa sisällönhallinnan valikko', 'Start writing or press "/" for commands…':'Kirjoita uutisen teksti tähän…'});
    for (const [original, label] of Object.entries(labels)) output = output.replaceAll(JSON.stringify(original), JSON.stringify(label)).replaceAll("'" + original + "'", "'" + label + "'");
    return output === code ? undefined : {code: output, map:null};
  }};
}

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
        updateConfig({vite:{plugins:[editorBasePlugin(base), editorUiPlugin()]}});
      }
    }
  };
}
