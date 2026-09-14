# Tuotantointegraatiot

Julkinen testirepo on https://github.com/SaimaJope/kontturit-testi-2. Testisivusto on https://saimajope.github.io/kontturit-testi-2/. Main-haaran muutokset julkaistaan GitHub Actionsilla. Keystatic toimii paikallisesti sekä verkossa Cloud-kirjautumisella. Uutisen verkkotallennus ja automaattinen julkaisu on testattu. Lomakkeen viestinvälitys on edelleen erillinen integraatio.

## GitHub Pages ja julkaisu

Julkaise vain `kontturi-web`-projektin sisältö. `.gitignore` sulkee pois riippuvuudet, käännöksen, kehitysvälimuistit ja ympäristötiedostot. Älä lisää ylemmän kansion sähköposteja, PDF-liitteitä tai tutkimusaineistoa.

Staattinen julkaisu käyttää komentoja `npm ci`, `npm run check`, `npm test`, `npm run build` ja `npm run verify`. Julkaisukansio on `dist`. Käytä Node 24:ää. Palvelimen tulee tukea hakemistojen `index.html`-tiedostoja ja palauttaa puuttuvalle polulle `404.html` HTTP-tilalla 404.

`SITE_ORIGIN` määrää kanonisen pääosoitteen ja sivukartan alkuperän. Kopioi tarvittaessa `.env.example` tiedostoksi `.env`. `PUBLIC_INDEXABLE=false` estää indeksoinnin sekä metatiedolla että robots.txt-tiedostolla. Vasta tuotannon julkaisuun asetetaan `PUBLIC_INDEXABLE=true` ja rakennetaan sivusto uudelleen. Paikallisen/staging-version asetusta ei vaihdeta vahingossa tuotantoon.

Nykyinen www.kontturi.fi ohjasi inventointipäivänä asianajotoimisto.com-osoitteeseen. Lopullinen pääverkkotunnus valitaan julkaisussa. Vanhat sivupolut säilyvät manifestin mukaisesti. Vanhojen uutislistausten `ccm_paging_p=2–4` ohjaus toimii selaimessa; hostingissa on hyvä tehdä vastaava pysyvä HTTP-ohjaus `/uutiset/sivu/2–4`-osoitteisiin. Palvelukohtaiset lisäverkkotunnukset voidaan ohjata suoraan vastaavaan palvelusivuun.

## GitHub-pohjainen sisällönhallinta

Paikallinen Keystatic käyttää määritystä `storage: { kind: 'local' }`. Se on tarkoitettu paikalliseen, luotettuun työasemaan ja tallentaa levylle. `/api/keystatic` ei sisälly staattiseen tuotantokäännökseen. Julkisen `/keystatic`-editorin tallennustapa on erikseen `cloud`.

Etämuokkaukseen on toteutettu erillinen Keystatic Cloud -määritys. Sen staattinen editori julkaistaan samalla GitHub Pages -sivustolla; Keystatic Cloud hoitaa kirjautumisen ja valtuutetut GitHub-tallennukset. Julkiseen sivustoon ei lisätä palvelinsalaisuuksia. Käyttöönoton tila ja julkaisumuuttuja on kuvattu tiedostossa [EDITOR-CLOUD.md](EDITOR-CLOUD.md).

Tarkista toteutushetkellä [Keystaticin GitHub-ohje](https://keystatic.com/docs/github-mode) ja [Astro-integraatio](https://keystatic.com/docs/installation-astro). Älä paljasta paikallisen editorin API:a verkkoon.

## Yhteydenottolomake

`ContactAdapter.submit(ContactRequest)` palauttaa joko `local`- tai `sent`-tuloksen. Nykyinen adapteri ei tee verkkopyyntöä eikä tallenna viestin sisältöä. Lomakkeesta näkyy tämä sekä ennen lähetystä että sen jälkeen.

Tuotannossa korvaa adapteri palvelinendpointia kutsuvalla toteutuksella. Endpoint tarkistaa kentät uudelleen, rajoittaa pyyntötiheyttä, käsittelee roskapostin ja lähettää viestin sovittuun toimiston osoitteeseen. Salaiset tunnisteet kuuluvat palvelimelle. Onnistuminen näytetään vain palvelimen vahvistaman toimituksen jälkeen. Toteuta virhe- ja aikakatkaisutilat sekä toimiston hyväksymä tietojen käsittely; sen jälkeen päivitä paikallisuudesta kertova lomaketeksti. Älä testaa toimitusta oikeilla asiakastiedoilla.

## Analytiikka ja tietosuoja

Sivusto ei lataa ulkoisia fontteja, upotuksia tai analytiikkaa eikä aseta analytiikkaevästeitä. Julkaistun tietosuojaselosteen alkuperäinen sisältö ja päivityspäivä on säilytetty. Jos käsittely, analytiikka tai palveluntarjoajat muuttuvat, päivitä tiedot todellisen tuotantototeutuksen mukaisiksi.

GitHub Pages -julkaisu käyttää asetuksia SITE_ORIGIN=https://saimajope.github.io ja SITE_BASE_PATH=/kontturit-testi-2. Rakennus lisää projektipolun sisäisiin linkkeihin, kuviin ja hakukonemetatietoihin muuttamatta lähdesisältöjen alkuperäisiä osoitteita. Paikallisesti SITE_BASE_PATH jätetään tyhjäksi. Testisivuston indeksointi pysyy estettynä.
