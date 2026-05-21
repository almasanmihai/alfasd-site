# Alfa Structural Design — site static

Site de prezentare construit cu [Astro](https://astro.build) și Tailwind CSS: pagini rapide, SEO (titluri, descrieri, Open Graph, JSON-LD, sitemap), portofoliu din fișiere Markdown.

## Comenzi

```bash
npm install
npm run dev
npm run build
npm run preview
```

### Portofoliu: foldere noi

La fiecare `npm run dev` și `npm run build` rulează automat `scripts/sync-portfolio-folders.mjs`: pentru orice subfolder nou din `public/portofoliu/` care nu are încă proiect, se creează un fișier `src/content/projects/auto-<slug>.md` cu `mediaFolder` setat. Puteți edita titlul, categoria și textul acolo. Puteți rula manual: `npm run sync-portfolio`.

Folderele al căror nume începe cu `.` sau `_` sunt ignorate (ex. `_temp`).

## Conținut portofoliu

Fișiere în `src/content/projects/*.md`. În frontmatter:

- `mediaFolder`: folderul cu poze, **relativ la `public/`**, fără `/` la început, ex. `portofoliu/2S+P+11E Bucuresti`
- **Copertă:** puneți în acel folder un fișier numit exact `cover.jpg`, `cover.jpeg`, `cover.png` sau `cover.webp` (litere mici, prefix `cover.`). Site-ul îl folosește automat pe carduri și sus pe pagina proiectului.
- **Galerie:** toate celelalte imagini din același folder (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`) apar automat în galerie, sortate alfabetic.
- Dacă **nu** există `cover.*`, cardul arată placeholder-ul gri; pozele tot apar în galerie.
- Opțional legacy: fără `mediaFolder`, puteți seta manual `cover` și `gallery` (liste de căi care încep cu `/`).
- `category`: `rezidential` | `industrial` | `educational` | `alte`

**Confidențialitate:** folosiți doar fotografii fără plăcuțe, nume de clienți, numere de înmatriculare sau persoane recognoscibile, conform politicii agreate.

## Logo

Înlocuiți `public/logo.svg` cu logo-ul vectorial al firmei (păstrați același nume de fișier sau actualizați `src/components/Header.astro`).

## Formular contact

Formularul este pregătit pentru [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`). Pe **Vercel** sau alt host static, folosiți [Formspree](https://formspree.io), un serverless function sau un link `mailto:`.

## Domeniu și SEO

`site` în `astro.config.mjs` este setat la `https://www.alfasd.ro`. La deploy pe alt domeniu, actualizați URL-ul și `public/robots.txt` (linia Sitemap).

## Deploy

- **Netlify / Vercel**: conectați repo-ul, build `npm run build`, folder output `dist`.
- După go-live, redirecționați domeniul de la Webnode către noul hosting.
