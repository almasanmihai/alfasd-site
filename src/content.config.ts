import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['rezidential', 'industrial', 'educational', 'alte']),
    typology: z.string(),
    year: z.string().optional(),
    region: z.string().optional(),
    materials: z.array(z.string()),
    tags: z.array(z.string()),
    /**
     * Folder sub `public/` cu poze (fără slash la început), ex. `portofoliu/2S+P+11E Bucuresti`.
     * Copertă automată: fișier `cover.jpg` / `cover.webp` / `cover.png` etc.
     * Galerie: restul imaginilor din folder, sortate.
     */
    mediaFolder: z.string().optional().default(''),
    /** Opțional, dacă nu folosești `mediaFolder` */
    cover: z.string().optional().default(''),
    gallery: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0)
  })
});

export const collections = { projects };
