import { createContext, useContext, useEffect, useId, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { fields } from '@keystatic/core';
import localConfig from '../../keystatic.config';
import { articleRoute, articleSlug } from './editor-utils';

const DraftContext = createContext({ slug: '', setSlug: (_slug: string) => {} });
export function NewsDraftProvider({ children }: PropsWithChildren) {
  const [slug, setSlug] = useState('');
  return <DraftContext.Provider value={{ slug, setSlug }}>{children}</DraftContext.Provider>;
}
const original = localConfig.collections!.news.schema;
const title = {
  ...original.title,
  Input: function NewsTitle({ value, onChange, forceValidation }: Parameters<typeof original.title.Input>[0]) {
    const id = useId();
    const { setSlug } = useContext(DraftContext);
    const creating = location.pathname.endsWith('/create');
    useEffect(() => { if (creating) setSlug(value.slug); }, [value.slug, creating, setSlug]);
    const invalid = forceValidation && (!value.name.trim() || !value.slug);
    return <div className="editor-field editor-title-field">
      <label htmlFor={id}>Uutisen otsikko <span aria-hidden="true">*</span></label>
      <input id={id} value={value.name} autoFocus required aria-invalid={invalid || undefined}
        aria-describedby={`${id}-help`} placeholder="Kirjoita uutisen otsikko"
        onChange={event => onChange({ name: event.target.value, slug: creating ? articleSlug(event.target.value) : value.slug })} />
      <p id={`${id}-help`}>{invalid ? 'Kirjoita uutiselle otsikko.' : 'Selkeä otsikko kertoo lukijalle tärkeimmän.'}</p>
    </div>;
  },
};
const route = {
  ...original.route,
  Input: function NewsRoute({ value, onChange }: Parameters<typeof original.route.Input>[0]) {
    const { slug } = useContext(DraftContext);
    const creating = location.pathname.endsWith('/create');
    useEffect(() => { const next = slug ? articleRoute(slug) : ''; if (creating && value !== next) onChange(next); }, [creating, slug, value, onChange]);
    return <details className="editor-details"><summary>Uutisen verkko-osoite</summary>
      <p>{creating ? 'Osoite muodostuu otsikosta automaattisesti.' : 'Osoite säilyy samana myös otsikkoa muokatessa.'}</p>
      <code>{value || 'Kirjoita ensin uutisen otsikko.'}</code>
    </details>;
  },
};
export const newsSchema = {
  title,
  description: fields.text({ label: 'Lyhyt esittely', multiline: true, description: 'Yksi tai kaksi lausetta, jotka näkyvät uutislistassa ja hakutuloksissa.' }),
  date: fields.date({ label: 'Julkaisupäivä', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
  image: original.image,
  imageAlt: fields.text({ label: 'Mitä kuvassa näkyy?', description: 'Lyhyt kuvaus auttaa ruudunlukijaa käyttäviä lukijoita.' }),
  content: original.content,
  route,
  sourceUrl: { ...original.sourceUrl, Input: () => null },
};
