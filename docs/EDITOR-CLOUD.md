# Uutisten verkkomuokkaus

Sivusto julkaistaan GitHub Pagesissa. Keystatic Cloud hoitaa editorin kirjautumisen ja tallentaa hyväksytyn käyttäjän muutokset GitHub-repoon. GitHub Actions rakentaa testisivuston uudelleen jokaisesta main-haaran muutoksesta.

## Käyttöönoton tila

Verkkoeditorin koodi on toteutettu. Keystatic Cloud -tili ja `kontturi-testi`-työtila on luotu. GitHub-sovelluksen asennus on rajattu `SaimaJope/kontturit-testi-2`-repoon, mutta GitHubin pyytämä sähköpostivahvistus ja pilviprojektin yhdistäminen ovat vielä kesken. Verkkotallennusta ei ole vielä testattu eikä editoria aktivoitu julkisella sivulla.

## Aktivointi

1. Viimeistele GitHubin Confirm access -vaihe ja Keystatic Cloudin asennus vain testirepoon.
2. Luo Keystatic Cloudissa projekti tähän repoon ja määritä julkaistu osoite `https://saimajope.github.io/kontturit-testi-2/`.
3. Lisää repon Actions-muuttujaksi `KEYSTATIC_CLOUD_PROJECT` pilviprojektin asetuksista saatu `tiimi/projekti`-tunniste. Se on julkinen tunniste, ei salainen avain.
4. Käynnistä Publish test website -työnkulku. Sivun alatunnisteeseen ilmestyy Muokkaa sivustoa -linkki.
5. Kirjaudu osoitteessa `https://saimajope.github.io/kontturit-testi-2/keystatic/`, muokkaa uutista, tallenna ja tarkista valmistuneen Pages-julkaisun sisältö. Testaa myös sisäänkirjautuminen suoraan uutiskokoelman linkistä.
6. Kutsu kokeilijat Keystatic Cloudin Kontturi testi -työtilaan heidän vahvistetuilla sähköpostiosoitteillaan. Käyttäjät pääsevät kaikkiin tämän työtilan projekteihin; pidä työtila vain Kontturin testiä varten.

## Toteutus

`src/editor` sisältää staattisen, kirjautumisen vaativan selain-editorin. Julkisessa käännöksessä ei ole paikallista Keystatic-API:a. Paikallinen `/keystatic` käyttää edelleen projektitiedostoja. Pilvieditori lisätään vain tuotantokäännökseen, kun `PUBLIC_KEYSTATIC_CLOUD_PROJECT` on asetettu.

Keystatic 0.6.9 olettaa editorin olevan verkkotunnuksen juuressa. `scripts/cloud-editor.mjs` sovittaa sen selainreitit ja OAuth-paluuosoitteen Pagesin projektipolkuun rakennuksen aikana. Pakettitiedostoja tai kirjautumisen tarkistuksia ei muuteta. Päivitys toiseen Keystatic-versioon vaatii tämän sovituksen tarkistamisen; CI testaa yhteensopivuuden. Syvien editorilinkkien päivitys palautuu 404-sivun kautta staattiselle editorisivulle, joka palauttaa saman alkuperän editorireitin. OAuth-paluuosoite rakennetaan omaksi HTML-sivukseen.

Sisällön tallennus päivittää repoa. Julkaistu sivusto päivittyy vasta onnistuneen Actions-ajon valmistuttua. Muokkaukset eivät siirry paikalliseen työkansioon ilman Git-päivitystä.
