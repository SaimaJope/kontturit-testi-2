// A convenience screen lock. Cloud authentication still protects writes.
export const PIN_SESSION_KEY = 'kontturi-editor-unlocked-v1';
export const isValidPin = (pin: string) => pin === '4444';
export function articleSlug(title: string): string {
  return title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100).replace(/-$/, '');
}
export function articleRoute(slug: string): string { return `/uutiset/${slug}`; }
