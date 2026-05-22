# Alfa Structural Design — site static

Site de prezentare construit cu [Astro](https://astro.build) și Tailwind CSS: pagini rapide, SEO (titluri, descrieri, Open Graph, JSON-LD, sitemap), portofoliu din fișiere Markdown.

## Comenzi

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Portofoliu — cum adaugi un proiect nou

1. Creezi folderul `public/portofoliu/Nume lucrare/`
2. Pui `cover.webp` (sau `cover.jpg`) + restul pozelor
3. La `npm run build` (sau push pe GitHub → Cloudflare):
   - `sync-portfolio-folders.mjs` creează `src/content/projects/auto-*.md` dacă lipsește proiectul
   - `generate-portfolio.mjs` regenerează `src/data/portfolio-media.json` cu toate imaginile
4. Editezi fișierul `.md` generat (titlu, categorie, text) dacă vrei

Folderele care încep cu `.` sau `_` sunt ignorate.

### Câmpuri în `src/content/projects/*.md`

- `mediaFolder`: ex. `portofoliu/2S+P+11E Bucuresti` (fără `/` la început)
- `category`: `rezidential` | `industrial` | `educational` | `alte`

Pozele **nu** se listează manual în `.md` — vin din JSON generat la build.

Scripturi utile: `npm run sync-portfolio`, `npm run generate-portfolio`, `node scripts/validate-portfolio.mjs`

## Formular contact

[Formspree](https://formspree.io) — după trimitere, redirect la `/contact/?trimis=1` cu mesaj de confirmare.

## Deploy (Cloudflare Pages + GitHub)

| Setare | Valoare |
|--------|---------|
| Build command | `npm run build` |
| Build output | `dist` |

Site **static** — nu necesită adapter Cloudflare Workers.

## Domeniu și SEO

`site` în `astro.config.mjs`: `https://www.alfasd.ro`. Actualizați și `public/robots.txt` dacă schimbați domeniul.
