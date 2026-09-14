# Kontturi & Co — paikallinen verkkosivusto

Suomenkielinen Astro-sivusto ja tiedostoihin tallentava Keystatic-editori. Lähdekoodin GitHub-repo: https://github.com/SaimaJope/kontturit-testi-2. GitHub-repo ei itsessään julkaise sivustoa tai käynnistä editoripalvelinta.

## Käynnistä tällä tietokoneella

Kaksoisnapsauta **Start-Kontturi.cmd**. Käynnistys avaa sivuston selaimeen.

- Sivusto: http://127.0.0.1:4321
- Sisällönhallinta: http://127.0.0.1:4321/keystatic
- Lopetus: **Stop-Kontturi.cmd**.

Palvelin on sidottu vain tämän tietokoneen osoitteeseen 127.0.0.1. Verkkoyhteyttä ei tarvita sivuston kuviin tai fontteihin. Sähköposti-, puhelin- ja ulkoiset yhteistyökumppanilinkit avaavat käyttäjän valitseman palvelun.

## Sisällön muokkaaminen

1. Avaa sisällönhallinta ja valitse **Uutiset**, **Lakipalvelut**, **Asiantuntijat ja henkilökunta**, **Toimipisteet** tai **Muut sivut**.
2. Avaa sivu. Muuta tekstiä, kuvaa tai yhteystietoja. Kuvan voi valita omalta tietokoneelta. Kuvan kuvaus kertoo kuvan sisällön ruudunlukijalle.
3. Paina editorin **Tallentaa**-painiketta. Keystaticin suomennoksessa painikkeen nimi on tällä hetkellä tämä.
4. Avaa tai päivitä vastaava sivu. Tallennus muuttaa projektin `.mdoc`-tiedostoa ja kuvatiedostoja; muutos säilyy selaimen ja palvelimen sulkemisen jälkeen.

**Säilytä olemassa olevan sivun tiedoston tunniste ja sivun osoite.** Otsikkoa voi muuttaa muuttamatta osoitetta. Uudelle uutiselle annetaan otsikko, tunniste, osoite muodossa `/uutiset/oma-uutinen`, lyhyt kuvaus, julkaisupäivä ja sisältö. Osoitteen tulee olla yksilöllinen. Päivämäärä säilyy uutisen omana julkaisupäivänä.

Etusivun pääotsikon ja johdannon löydät kohdasta **Etusivun tekstit**. Palveluiden kuvaukset ja asiantuntijavalinnat ovat palvelun omassa tietueessa. Toimistojen yhteystiedot tulevat yhteisistä toimipistetietueista.

## Kehittäjälle

Node.js 24 LTS on suositeltu; vähimmäisversio 22.19. Tällä tietokoneella käynnistystiedostot käyttävät valmista Node 24 -ympäristöä. Riippuvuudet on jo asennettu.

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run verify
npm run preview
```

Astro 7 käynnistää kehityspalvelimen taustalle. Sen tila, lokit ja lopetus: `npx astro dev status`, `npx astro dev logs`, `npx astro dev stop`. Tarkistettu julkinen staattinen sivusto syntyy `dist`-kansioon. Editorireittejä ei rakenneta sinne. Kehitys- ja tuotantokäännöksillä on erilliset Vite-välimuistit.

`src/content` sisältää rakenteisen sisällön, `public/images` paikalliset kuvat, `src/styles/global.css` yhteiset tyylit ja värit. `src/pages/[...path].astro` käyttää yhteisiä sivupohjia. `package-lock.json` lukitsee asennetut riippuvuudet. Sähköpostit, brändiohjeen PDF ja tutkimusaineisto ovat tämän projektin ulkopuolella.

## Luovutuksen sisältö

- `docs/migration-manifest.json`: lähteet ja lopulliset sivuosoitteet.
- `docs/verification.json`: staattisen käännöksen sivu- ja linkkitarkistus.
- `docs/browser-verification.json`: kaikkien sivujen selain- ja leveystarkistus.
- `docs/QA.md`: testatut toiminnot, tarkistusmenetelmät ja tulokset.
- `docs/INTEGRATIONS.md`: myöhemmät julkaisu-, GitHub- ja lomakeintegraatiot.
- `docs/SOURCE-NOTES.md`: lähteiden epävarmuudet ja säilytetyt historialliset tiedot.
- `docs/WALKTHROUGH-FI.md`: lyhyt esittelyrunko Tatun tapaamiseen.
- `docs/screenshots`: työpöytä-, tabletti- ja mobiilikuvat.

Paikallinen lomake validoi tiedot ja ilmoittaa selvästi, ettei viestiä lähetetty. Varsinainen viestinvälitys liitetään myöhemmin `src/lib/contact.ts`-rajapinnan kautta.
