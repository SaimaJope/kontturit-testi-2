import { useEffect, useRef, useState } from 'react';
import { Keystatic } from '@keystatic/core/ui';
import type { Config } from '@keystatic/core';
import localConfig from '../../keystatic.config';
import { NewsDraftProvider, newsSchema } from './NewsFields';
import { isValidPin, PIN_SESSION_KEY } from './editor-utils';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import './editor.css';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const editor = `${base}/keystatic`;
const main = `${editor}/branch/main`;
const logo = `${base}/images/a6630904-Kontturi_4v_28cm_logo.svg`;
const project = import.meta.env.PUBLIC_KEYSTATIC_CLOUD_PROJECT;
const config: Config = {
  ...localConfig,
  ui: { brand: { name: 'Kontturi & Co', mark: () => <span style={{display:'block', width:30, height:30, overflow:'hidden', flexShrink:0}}><img src={logo} alt="" style={{height:30, width:'auto', maxWidth:'none'}} /></span> }, navigation: { 'Julkaise ja päivitä': ['news'], 'Sivuston tiedot': ['offices','people','services','pages','home'] } },
  collections: { ...localConfig.collections, news: { ...localConfig.collections!.news, columns: ['title','date'], schema: newsSchema } },
  storage: { kind: 'cloud' }, cloud: { project },
};
export type EditorArticle = { id: string; title: string; date: string; image?: string };
function Arrow() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>; }
function Lock() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/></svg>; }
function PinScreen({ unlock }: { unlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (isValidPin(pin)) { unlock(); return; }
    setError(true); setPin(''); input.current?.focus();
  }
  return <main className="pin-page">
    <a className="pin-brand" href={`${base}/`}><img src={logo} alt="Kontturi & Co – sivustolle" /></a>
    <div className="pin-layout">
      <section className="pin-intro"><span className="editor-eyebrow">KONTTURI & CO · SISÄLLÖNHALLINTA</span>
        <h1>Omat sanat.<br/><span>Oma sivusto.</span></h1>
        <p>Julkaise uutisia ja pidä toimiston tiedot ajan tasalla. Kaikki tärkeä yhdessä paikassa.</p>
        <div className="pin-signature">Ihmiseltä ihmiselle.</div>
      </section>
      <section className="pin-card" aria-labelledby="pin-title">
        <div className="pin-icon"><Lock /></div><h2 id="pin-title">Tervetuloa takaisin</h2>
        <p>Avaa sisällönhallinta nelinumeroisella PIN-koodilla.</p>
        <form onSubmit={submit}>
          <label htmlFor="editor-pin">PIN-koodi</label>
          <input ref={input} id="editor-pin" type="password" inputMode="numeric" maxLength={4} autoComplete="off" autoFocus
            value={pin} onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setError(false); }}
            aria-invalid={error || undefined} aria-describedby="pin-feedback" placeholder="••••" />
          <div id="pin-feedback" className="pin-feedback" role="status">{error ? 'Koodi ei täsmää. Tarkista koodi ja yritä uudelleen.' : 'Syötä neljä numeroa.'}</div>
          <button className="editor-button" type="submit">Avaa sisällönhallinta <Arrow /></button>
        </form>
        <p className="pin-note">Tallentamiseen tarvitset myös henkilökohtaisen muokkausoikeuden.</p>
      </section>
    </div>
    <footer className="pin-footer"><span>Asianajotoimisto Kontturi & Co Oy</span><a href={`${base}/`}>Takaisin sivustolle <Arrow /></a></footer>
  </main>;
}
function Dashboard({ articles }: { articles: EditorArticle[] }) {
  return <main className="editor-dashboard">
    <section className="desk-welcome"><div><span className="editor-eyebrow">OMA SIVUSTO</span><h1>Mitä tänään kerrotaan?</h1><p>Uusi uutinen, pieni korjaus tai päivitetty yhteystieto.<br/>Aloita siitä, mikä on ajankohtaista.</p></div>
      <a className="editor-button" href={`${main}/collection/news/create`}><span aria-hidden="true">＋</span> Kirjoita uutinen <Arrow /></a></section>
    <div className="desk-grid"><section className="desk-news"><div className="desk-section-title"><h2>Viimeisimmät uutiset</h2><a href={`${main}/collection/news`}>Kaikki uutiset <Arrow /></a></div>
      {articles.map(article => <a className="desk-article" key={article.id} href={`${main}/collection/news/item/${encodeURIComponent(article.id)}`}>
        {article.image ? <img src={`${base}${article.image}`} alt="" /> : <span className="article-empty" aria-hidden="true">K</span>}
        <div><span className="desk-date">{article.date}</span><h3>{article.title}</h3><span className="article-action">Muokkaa uutista</span></div><Arrow />
      </a>)}
    </section><aside className="desk-help"><span className="editor-eyebrow">NÄIN HELPPOA SE ON</span><h2>Kirjoita. Tarkista.<br/>Tallenna.</h2><p>Avaa uutinen tai luo uusi. Lisää teksti ja halutessasi kuva.</p><p><strong>Tallenna</strong> julkaisee muutoksesi testisivustolle. Päivittyminen kestää yleensä muutaman minuutin.</p><a href={`${base}/uutiset/`} target="_blank" rel="noreferrer">Katso uutiset sivustolla <Arrow /></a></aside></div>
    <section className="desk-shortcuts" aria-label="Muut sivuston tiedot">
      <a href={`${main}/collection/offices`}><span>Toimipisteet</span><p>Yhteystiedot ja aukioloajat</p><Arrow /></a>
      <a href={`${main}/collection/people`}><span>Henkilökunta</span><p>Esittelyt ja yhteystiedot</p><Arrow /></a>
      <a href={`${main}/singleton/home`}><span>Etusivu</span><p>Pääotsikko ja johdanto</p><Arrow /></a>
    </section>
  </main>;
}
export default function CloudEditor({ articles = [] }: { articles?: EditorArticle[] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [path, setPath] = useState(() => location.pathname);
  useEffect(() => {
    try { if (sessionStorage.getItem(PIN_SESSION_KEY) === 'yes') { setUnlocked(true); setOpened(true); } } catch {}
    const update = () => setPath(location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener('kontturi:editor-route', update);
    return () => { window.removeEventListener('popstate', update); window.removeEventListener('kontturi:editor-route', update); };
  }, []);
  useEffect(() => { if (unlocked) window.scrollTo(0, 0); }, [unlocked]);
  function unlock() { try { sessionStorage.setItem(PIN_SESSION_KEY, 'yes'); } catch {} setOpened(true); setUnlocked(true); }
  function lock() { try { sessionStorage.removeItem(PIN_SESSION_KEY); } catch {} setUnlocked(false); }
  const dashboard = path.replace(/\/$/, '') === editor || path.replace(/\/$/, '') === main;
  return <>
    {!unlocked && <PinScreen unlock={unlock} />}
    {opened && <div className="editor-workspace" hidden={!unlocked}>
      <header className="editor-header"><a href={`${editor}/`} aria-label="Sisällönhallinnan aloitus"><img src={logo} alt="Kontturi & Co" /></a>
        <nav aria-label="Sisällönhallinnan valikko"><a href={`${editor}/`} aria-current={dashboard ? 'page' : undefined}>Aloitus</a><a href={`${main}/collection/news`} aria-current={path.includes('/collection/news') ? 'page' : undefined}>Uutiset</a><a href={`${base}/`} target="_blank" rel="noreferrer">Avaa sivusto ↗</a></nav>
        <button className="editor-lock" aria-label="Lukitse editori" onClick={lock}><Lock /><span>Lukitse</span></button>
      </header>
      {dashboard ? <Dashboard articles={articles} /> : <>
        <div className="editor-guidance"><span><strong>{path.endsWith('/create') ? 'Uusi sisältö' : 'Sisällön muokkaus'}</strong> · Muokkaa rauhassa ja paina {path.endsWith('/create') ? 'Julkaise' : 'Tallenna'}, kun olet valmis.</span><span>Julkaisu päivittyy muutamassa minuutissa.</span></div>
        <div className="editor-native"><NewsDraftProvider>{project ? <Keystatic config={config} /> : <p>Editorin yhteyttä ei ole määritetty.</p>}</NewsDraftProvider></div>
      </>}
    </div>}
  </>;
}
