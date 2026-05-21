/**
 * Creează automat `src/content/projects/auto-*.md` pentru fiecare subfolder
 * din `public/portofoliu/` care nu are deja un proiect (niciun .md cu același `mediaFolder`).
 * Nu șterge foldere sau fișiere existente.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const portDir = path.join(root, 'public', 'portofoliu');
const projectsDir = path.join(root, 'src', 'content', 'projects');

function slugify(name) {
  const ascii = name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
  const s = ascii
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return s || 'proiect';
}

function readMediaFoldersFromProjects() {
  const set = new Set();
  if (!fs.existsSync(projectsDir)) return set;
  for (const file of fs.readdirSync(projectsDir)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(projectsDir, file), 'utf8');
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const block = fm[1];
    const line = block.split('\n').find((l) => l.trimStart().startsWith('mediaFolder:'));
    if (!line) continue;
    let val = line.replace(/^\s*mediaFolder:\s*/, '').trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val) set.add(val);
  }
  return set;
}

function main() {
  if (!fs.existsSync(portDir)) {
    console.log('[sync-portfolio] public/portofoliu lipsește — nimic de sincronizat.');
    return;
  }

  const covered = readMediaFoldersFromProjects();
  const entries = fs.readdirSync(portDir, { withFileTypes: true });
  const folders = entries
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !name.startsWith('.') && !name.startsWith('_'));

  let created = 0;
  for (const folder of folders) {
    const mediaFolder = `portofoliu/${folder}`;
    if (covered.has(mediaFolder)) continue;

    const baseSlug = slugify(folder);
    let fileName = `auto-${baseSlug}.md`;
    let n = 0;
    while (fs.existsSync(path.join(projectsDir, fileName))) {
      n += 1;
      fileName = `auto-${baseSlug}-${n}.md`;
    }

    const title = folder;
    const body =
      '---\n' +
      `title: ${JSON.stringify(title)}\n` +
      'category: rezidential\n' +
      'typology: Proiect portofoliu\n' +
      'materials:\n' +
      '  - beton armat\n' +
      'tags:\n' +
      '  - portofoliu\n' +
      'featured: false\n' +
      'order: 999\n' +
      `mediaFolder: ${JSON.stringify(mediaFolder)}\n` +
      '---\n\n' +
      'Proiect adăugat automat din folderul `public/portofoliu`. Editați titlul, categoria și textul; coperta = fișier `cover.jpg` / `cover.webp` în acel folder.\n';

    fs.writeFileSync(path.join(projectsDir, fileName), body, 'utf8');
    covered.add(mediaFolder);
    created += 1;
    console.log(`[sync-portfolio] + ${fileName} ← ${mediaFolder}`);
  }

  if (created === 0) {
    console.log('[sync-portfolio] Toate folderele au deja proiect.');
  } else {
    console.log(`[sync-portfolio] Gata: ${created} proiect(e) nou(e).`);
  }
}

main();
