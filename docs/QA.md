# Luovutustarkistus — 14.9.2026

## Käännös ja sisältö

- Astro-käännös: 123 HTML-sivua, onnistunut.
- TypeScript/Astro-tarkistus: 0 virhettä, 0 varoitusta, 0 huomautusta.
- 115 inventoitua alkuperäistä suomenkielistä sivua säilytetty. Lisäksi Meistä, kolme toimistoa, kolme uutisarkiston jatkosivua ja 404.
- Kaikkien sivujen paikalliset linkit, kuvat, pääotsikot, metatiedot ja JSON-LD tarkistettu: ei virheitä. Sivujen otsikot ja kuvaukset ovat yksilöllisiä.
- Kaikki 31 uutispäivämäärää verrattu lähdeinventaarioon. Henkilötiedot ja puhelinlinkkien näkyvät numerot tarkistettu. Jyväskylän kohdenumero on +358207300995.
- Kaikki 86 lopullista rasterikuvatiedostoa purettu kuvankäsittelykirjastolla kokonaan: ei virheitä. Lopullisia käytössä olevia kuvatiedostoja on SVG:t mukaan lukien 93, yhteensä noin 6,7 Mt.
- Julkisessa käännöksessä ei ole Keystatic-editoria, sen API:a eikä tarkistuskehystä.
- Paikalliset kuvat ja Montserrat 400/500 -fontit; julkisilla sivuilla ei ole ulkoisia fontti-, kuva- tai komentosarjapyyntöjä.

## Selain ja saavutettavuus

- Kaikki 123 sivua tarkistettu 320, 768 ja 1440 pikselin leveyksillä: 369 sivu/leveys-tarkistusta. Ei vaakaylivuotoa, puuttuvaa pääsisältöä tai havaittuja rikkinäisiä kuvia.
- 13 sivupohjaa tarkistettu kuvina työpöydällä, tabletilla ja mobiilissa. Kuvakaappaukset ovat `screenshots`-kansiossa.
- Pitkien suomenkielisten otsikoiden rivitys sekä kapean yhteydenottolomakkeen ja Meistä-linkkien asettelu korjattu.
- Mobiilivalikko avautuu näppäimistöllä. Tab siirtyy valikon linkkeihin; Escape sulkee valikon ja palauttaa kohdistuksen avauspainikkeeseen.
- Sisältöön siirtyvä ohituslinkki ja näkyvät näppäimistökohdistukset tarkistettu. Alatunnisteella on sinistä taustaa vasten valkoinen kohdistusmerkki.
- 200 % suurennos tarkistettu kaikille sivupohjille 1440 pikselin näkymässä 720 pikselin responsiivista kehystä kaksinkertaisesti suurentamalla. Ei vaakaylivuotoa. Tämä oli selaimen natiivin zoom-pikanäppäimen sijasta käytetty suurennos- ja uudelleenrivitystesti; käytetty tarkistuskehys on poistettu toimituksesta.
- Päätekstien värikontrastit: sininen/valkoinen 5,68:1, sininen/vaalea 5,32:1, harmaa/valkoinen 5,10:1 ja harmaa/vaalea 4,78:1. Ne ylittävät normaalin tekstin 4,5:1-rajan.

## Yhteydenotto

- Toimistosivun linkki esivalitsee oikean toimipisteen.
- Tyhjän lomakkeen ja virheellisten kenttien ilmoitukset näkyvät; kohdistus siirtyy ensimmäiseen virheelliseen kenttään.
- Kelvolliset testitiedot tuottavat selkeän paikallisen tuloksen: viestiä ei lähetetty. Tulos saa kohdistuksen ja on ruudunlukijan luettavissa.
- Adapterin kenttävalidoinnin ja paikallisen tuloksen testit läpäisty. Testissä ei lähetetty yhteydenottoja.

## Pysyvä muokkaaminen

- Jyväskylän aukioloteksti muutettiin editorissa muotoon “Avoinna arkisin klo 10–16”. Se tallentui `.mdoc`-tiedostoon ja näkyi sivulla sekä alatunnisteessa palvelimen uudelleenkäynnistyksen ja käännöksen jälkeen.
- Lappeenrannan toimiston avaamista koskevan uutisen lyhyt kuvaus ja kuvan saavutettavuusteksti muutettiin editorissa. Teksti, alkuperäinen päivämäärä 2.9.2024 ja valokuva säilyivät tallennuksessa ja käännöksessä.
- Keystaticin kuvakansiot sovitettiin sen tietuekohtaisiin polkuihin, jotta tekstin tallennus ei poista olemassa olevaa kuvaa.
- Editori avattiin uudelleen kylmäkäynnistyksen jälkeen. Sen tiedot tulevat projektin tiedostoista.

## Julkaisuasetukset

`SITE_ORIGIN` ja `PUBLIC_INDEXABLE=true` testattiin erillisellä paikallisella käännöksellä. Kanoniset osoitteet, sivukartta ja robots.txt muuttuvat asetuksen mukaan; 404 pysyy indeksoinnin ulkopuolella. Luovutettava käännös rakennettiin tämän jälkeen takaisin asetuksella `PUBLIC_INDEXABLE=false`.

Tuotannon viestinvälitys on myöhempi integraatio. Testisivuston hosting ja etämuokkaus on sittemmin toteutettu alla kuvatusti. Lähdeaineiston historialliset ja epävarmat tiedot on eroteltu tiedostoon `SOURCE-NOTES.md`.

## GitHub Pages ja verkkoeditori, 14.9.2026

- Keystatic Cloud yhdistetty vain testirepoon. Omistajan kirjautuminen julkisessa Pages-editorissa onnistui.
- Julkisella editorilla muutettiin Lappeenrannan toimiston avausuutisen lyhyttä kuvausta. Cloud loi commitin `56a0545c8bd8774b03bcc85f35c4000ba4c7959e`; diff sisälsi vain kuvauksen muutoksen.
- Commit käynnisti Actions-ajon `34889733333`, jonka build ja deploy onnistuivat. CI suoritti tyyppitarkistuksen, testit, käännöksen ja staattisen sivuston tarkistuksen.
- Julkiselta uutiselta tarkistettiin uusi kuvaus, alkuperäinen päivämäärä 2.9.2024 ja onnistuneesti latautuva alkuperäinen kuva. Päivitys tuotiin myös paikalliseen projektiin Git-päivityksellä.
- Uutisen suora editorilinkki ladattiin uudelleen: kirjautuminen ja tallennettu kuvaus säilyivät.
- Ensimmäisessä kirjautumistestissä löytynyt Pagesin loppuvinoviivan reititysongelma korjattiin. Automaattiset testit kattavat OAuth-paluuosoitteen kyselyparametrien säilymisen, syvän uutislinkin palautuksen ja vieraan alkuperän hylkäämisen.
- Cloudin käyttöönotossa esiintyi väliaikaisia palvelinvirheitä ja viiveitä; lopullinen kirjautumis- ja tallennusketju onnistui. Kokeilijoiden kutsut odottavat heidän vahvistettuja sähköpostiosoitteitaan.

## Kontturi-editori ja PIN-lukko, 14.9.2026

- Oma Kontturi-aloitussivu, paikallinen Montserrat, aito logo ja brändin värit tarkistettu selaimessa. Uutislistan otsikot, suomalaiset päivämäärät, uusimmat ensin -järjestys ja otsikkohaku toimivat.
- Väärä PIN näyttää virheen ja säilyttää kohdistuksen kentässä. 4444 avaa editorin. Suora uutislinkki uudessa välilehdessä kysyy myös PIN-koodin. Cloud-kirjautuminen on edelleen erillinen tallennuksen edellytys.
- Keskeneräinen uutisen muutos säilyi Lukitse → PIN → avaus -kokeessa. Lukittu editori ei näkynyt saavutettavuuspuussa.
- Uudistetulla lomakkeella tallennettu uutismuutos syntyi GitHubiin commitilla `dbc75112db117c71754a2d6dcd7e96aa4bb063b8`. Kuva, julkaisupäivä, lähdetieto, sisältö ja olemassa oleva URL säilyivät; metatietojen järjestys muuttui uuden kenttäjärjestyksen mukaisesti.
- Tyhjän uuden uutisen otsikko esti julkaisun. Ääkkösotsikko muodosti `/uutiset/aakkosten-testaus-jyvaskyla`-osoitteen automaattisesti. Testiluonnos tyhjennettiin julkaisematta.
- Uutislomake tarkistettiin 390 × 844 -näkymässä: dokumentin leveys 390 px, ei vaakaylivuotoa. Mobiilivalikko sulkeutui Escapella. Työpöytänäkymän listan sarakkeet ja lomakkeen asettelu tarkistettu.
- Tyyppitarkistus: 32 tiedostoa, ei virheitä, varoituksia tai vihjeitä. Kontaktiadapterin, reittien, PIN-syötteiden, suomenkielisten osoitteiden ja Keystatic-sovituksen automaattiset testit läpäisty. Staattinen käännös sisältää 123 julkista sivua ja kaksi editorin sisääntulosivua.
- Selainkonsolissa ei ollut virheitä lopullisessa testieditorissa. Keystaticin ulkoinen fonttipyyntö on poistettu; editorin Montserrat tulee paikallisesta paketista.
