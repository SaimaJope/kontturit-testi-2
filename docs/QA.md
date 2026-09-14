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

Tuotannon viestinvälitys, hosting ja GitHub-pohjainen etämuokkaus ovat sovitusti myöhempiä integraatioita. Lähdeaineiston historialliset ja epävarmat tiedot on eroteltu tiedostoon `SOURCE-NOTES.md`.
