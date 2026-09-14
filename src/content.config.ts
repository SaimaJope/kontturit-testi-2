import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(), route: z.string(), type: z.string(), description: z.string().default(''),
  image: z.string().default(''), imageAlt: z.string().default(''), sourceUrl: z.string().default(''),
  date: z.union([z.string(),z.date()]).transform(value => typeof value === 'string' ? value : value.toISOString().slice(0,10)).optional(), role: z.string().default(''), phone: z.string().default(''),
  email: z.string().default(''), address: z.string().default(''), postalCode: z.string().default(''),
  hours: z.string().default(''), order: z.number().default(0),
  relatedPeople: z.array(z.string()).default([]),
});
export const collections = Object.fromEntries(['services','people','news','pages','offices'].map(name => [name, defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: `./src/content/${name}` }), schema: schema.extend({ type: z.string().default(name) }),
})]));
