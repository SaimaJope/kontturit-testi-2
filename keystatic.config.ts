import { config, fields, collection, singleton } from '@keystatic/core';

const common = {
  title: fields.slug({ name: { label: 'Otsikko' }, slug: { label: 'Tiedoston tunniste', description: 'Säilytä nykyinen tunniste, kun muokkaat olemassa olevaa sivua.' } }),
  route: fields.text({ label: 'Sivun osoite', validation: { isRequired: true, pattern: { regex: /^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/, message: 'Aloita osoite vinoviivalla. Käytä pieniä kirjaimia, numeroita ja väliviivoja.' } }, description: 'Esimerkiksi /lakipalvelut/yritysjuridiikka. Säilytä olemassa oleva osoite.' }),
  description: fields.text({ label: 'Lyhyt kuvaus', multiline: true }),
  image: fields.image({ label: 'Kuva', directory: 'public/images', publicPath: '/images/' }),
  imageAlt: fields.text({ label: 'Kuvan kuvaus saavutettavuutta varten' }),
  sourceUrl: fields.text({ label: 'Alkuperäisen sivun osoite' }),
  content: fields.markdoc({ label: 'Sivun sisältö', options: { image: { directory: 'public/images', publicPath: '/images/' } } }),
};
export default config({
  locale: 'fi-FI',
  storage: { kind: 'local' },
  ui: { brand: { name: 'Kontturi · Sisällönhallinta' }, navigation: { 'Sivuston sisältö': ['news','services','people','offices','pages'], 'Etusivu': ['home'] } },
  collections: {
    news: collection({ label: 'Uutiset', slugField: 'title', columns: ['title'], path: 'src/content/news/*', format: { contentField: 'content' }, schema: { ...common, date: fields.date({ label: 'Julkaisupäivä' }) } }),
    services: collection({ label: 'Lakipalvelut', slugField: 'title', columns: ['title'], path: 'src/content/services/*', format: { contentField: 'content' }, schema: { ...common, relatedPeople: fields.array(fields.relationship({ label: 'Asiantuntija', collection: 'people', validation: { isRequired: true } }), { label: 'Asiantuntijat', itemLabel: props => props.value || 'Asiantuntija' }) } }),
    people: collection({ label: 'Asiantuntijat ja henkilökunta', slugField: 'title', columns: ['title'], path: 'src/content/people/*', format: { contentField: 'content' }, schema: { ...common, role: fields.text({ label: 'Tehtävä ja pätevyydet' }), phone: fields.text({ label: 'Puhelin' }), email: fields.text({ label: 'Sähköposti' }) } }),
    offices: collection({ label: 'Toimipisteet', slugField: 'title', columns: ['title'], path: 'src/content/offices/*', format: { contentField: 'content' }, schema: { ...common, address: fields.text({ label: 'Katuosoite' }), postalCode: fields.text({ label: 'Postinumero' }), phone: fields.text({ label: 'Puhelin' }), email: fields.text({ label: 'Sähköposti' }), hours: fields.text({ label: 'Aukioloajat' }), order: fields.integer({ label: 'Järjestys' }) } }),
    pages: collection({ label: 'Muut sivut', slugField: 'title', columns: ['title'], path: 'src/content/pages/*', format: { contentField: 'content' }, schema: common }),
  },
  singletons: {
    home: singleton({ label: 'Etusivun tekstit', path: 'src/data/home', format: { data: 'json' }, schema: {
      headline: fields.text({ label: 'Pääotsikko' }), accent: fields.text({ label: 'Sininen otsikkorivi' }),
      introduction: fields.text({ label: 'Johdanto', multiline: true }), reassurance: fields.text({ label: 'Yhteydenoton lisätieto' }),
    } }),
  },
});
