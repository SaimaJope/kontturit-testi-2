# Uutisten verkkomuokkaus

Sivusto julkaistaan GitHub Pagesissa. Keystatic Cloud hoitaa editorin kirjautumisen ja tallentaa hyväksytyn käyttäjän muutokset GitHub-repoon. GitHub Actions rakentaa testisivuston uudelleen jokaisesta main-haaran muutoksesta.

## Käyttöönoton tila

Verkkoeditorin koodi on toteutettu. Keystatic Cloud -tili, `kontturi-testi`-työtila ja projekti `kontturi-testi/kontturit-testi-2` on luotu. GitHubin sähköpostivahvistus ja Keystatic Cloud -sovelluksen asennus onnistuivat; asennus on rajattu `SaimaJope/kontturit-testi-2`-repoon.

Pilviprojekti luotiin 14.9.2026. Cloudin asetussivu hyväksyi Primary URL -kenttään vain alkuperäosoitteen `https://saimajope.github.io`. Kirjautumisvaiheen Add project URL -toiminnolla rekisteröitiin lisäksi oikea Pages-projektiosoite `https://saimajope.github.io/kontturit-testi-2`. Repon Actions-muuttuja `KEYSTATIC_CLOUD_PROJECT=kontturi-testi/kontturit-testi-2` on asetettu ja editori julkaistu. Omistajan kirjautuminen, uutisen tallennus GitHubiin, automaattinen Pages-julkaisu ja päivitetty julkinen sisältö on testattu. Paikallinen editori toimii edelleen.

Muiden kokeilijoiden kutsut odottavat heidän sähköpostiosoitteitaan. Pelkkä julkinen linkki ei anna muokkausoikeutta. Kutsuja ei ole vielä lähetetty.

## Uutisen muokkaaminen

1. Avaa [sisällönhallinta](https://saimajope.github.io/kontturit-testi-2/keystatic/) tai sivuston alatunnisteen **Muokkaa sivustoa** -linkki.
2. Avaa ruutulukko PIN-koodilla **4444**. Valitse aloitussivulta uutinen tai **Kirjoita uutinen**. Kirjaudu tarvittaessa omalla Keystatic Cloud -tunnuksellasi. Tunnuksen pitää kuulua Kontturi testi -työtilaan.
3. Muuta otsikkoa, lyhyttä esittelyä, kuvaa tai sisältöä. Uutislistassa on otsikkohaku ja päivämääräjärjestys, uusimmat ensin. Uuden uutisen tunniste ja osoite muodostuvat otsikosta; olemassa olevan uutisen tunniste ja osoite säilyvät automaattisesti.
4. Paina **Tallenna**, tai uuden uutisen kohdalla **Julkaise**. Muutos tallentuu GitHubiin ja käynnistää sivuston julkaisun. Sivusto näyttää muutoksen onnistuneen julkaisun jälkeen, yleensä muutamassa minuutissa.
5. Avaa uutinen julkisella sivustolla ja päivitä sivu. Muutokset eivät siirry omaan paikalliseen projektikansioon automaattisesti.

## PIN ja brändätty käyttöliittymä

PIN **4444** on käyttäjän pyytämä selaimen ruutulukko, ei palvelinpuolen pääsynvalvonta. Julkisen Pages-julkaisun lähdekoodi on luettavissa. Varsinaiset kirjoitusoikeudet tarkistaa edelleen Keystatic Cloud; PIN ei anna oikeutta tallentaa eikä kirjautumistunnuksia jaeta.

PIN avaa editorin kyseisen välilehden istunnossa. **Lukitse** palauttaa PIN-näkymän ja piilottaa editorin myös saavutettavuuspuusta. Keskeneräinen muokkaus säilyy muistissa lukitsemisen ajan. Välilehden sulkeminen päättää PIN-istunnon. Pilvikirjautumisesta voi erikseen kirjautua ulos editorin käyttäjävalikosta.

Kontturi-ilme, paikallinen Montserrat-fontti, aloitussivu ja uutiskentät ovat `src/editor`-kansiossa. Uutiset näytetään ihmisille luettavilla otsikoilla. `editorUiPlugin` sovittaa lukitun Keystatic-version suomennokset, vaalean teeman, sarakkeet, otsikkohaun ja reittitapahtuman rakennusaikana. Paikallisen kehityseditorin asetukset säilyvät alkuperäisinä.

## Aktivointi

1. Avaa olemassa oleva [Kontturi testi -työtila](https://keystatic.cloud/teams/kontturi-testi).
2. Projekti on jo yhdistetty testirepoon. Cloudin Primary URL on `https://saimajope.github.io`. Käyttäjille jaetaan suora editorilinkki `https://saimajope.github.io/kontturit-testi-2/keystatic/`, koska Cloudin projektikortti ei tunne Pagesin alihakemistoa.
3. Lisää repon Actions-muuttujaksi `KEYSTATIC_CLOUD_PROJECT` pilviprojektin asetuksista saatu `tiimi/projekti`-tunniste. Se on julkinen tunniste, ei salainen avain.
4. Käynnistä Publish test website -työnkulku. Sivun alatunnisteeseen ilmestyy Muokkaa sivustoa -linkki.
5. Kirjaudu osoitteessa `https://saimajope.github.io/kontturit-testi-2/keystatic/`, muokkaa uutista, tallenna ja tarkista valmistuneen Pages-julkaisun sisältö. Testaa myös sisäänkirjautuminen suoraan uutiskokoelman linkistä.
6. Kutsu kokeilijat Keystatic Cloudin Kontturi testi -työtilaan heidän vahvistetuilla sähköpostiosoitteillaan. Käyttäjät pääsevät kaikkiin tämän työtilan projekteihin; pidä työtila vain Kontturin testiä varten.

## Toteutus

`src/editor` sisältää staattisen, kirjautumisen vaativan selain-editorin. Julkisessa käännöksessä ei ole paikallista Keystatic-API:a. Paikallinen `/keystatic` käyttää edelleen projektitiedostoja. Pilvieditori lisätään vain tuotantokäännökseen, kun `PUBLIC_KEYSTATIC_CLOUD_PROJECT` on asetettu.

Keystatic 0.6.9 olettaa editorin olevan verkkotunnuksen juuressa. `scripts/cloud-editor.mjs` sovittaa sen selainreitit ja OAuth-paluuosoitteen Pagesin projektipolkuun rakennuksen aikana. Pakettitiedostoja tai kirjautumisen tarkistuksia ei muuteta. Päivitys toiseen Keystatic-versioon vaatii tämän sovituksen tarkistamisen; CI testaa yhteensopivuuden. Syvien editorilinkkien päivitys palautuu 404-sivun kautta staattiselle editorisivulle, joka palauttaa saman alkuperän editorireitin. OAuth-paluuosoite rakennetaan omaksi HTML-sivukseen.

Pagesin lisäämä loppuvinoviiva poistetaan selaimen osoitteesta ennen editorin reititystä; kirjautumisen koodi ja state säilyvät kyselyssä muuttumattomina. Reittisovituksen testit kattavat OAuth-paluuosoitteen, syvän uutislinkin palautuksen ja vieraan alkuperän hylkäämisen.

Sisällön tallennus päivittää repoa. Julkaistu sivusto päivittyy vasta onnistuneen Actions-ajon valmistuttua. Muokkaukset eivät siirry paikalliseen työkansioon ilman Git-päivitystä.
