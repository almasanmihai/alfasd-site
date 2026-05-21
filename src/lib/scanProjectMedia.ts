import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;
const COVER_NAME = /^cover\.(jpe?g|png|webp|gif|avif)$/i;

export type ProjectMedia = { cover: string; gallery: string[] };

/**
 * Scanează `public/<mediaFolder>`: copertă = fișier `cover.jpg` (sau .webp, .png…);
 * galerie = toate celelalte imagini, sortate alfabetic.
 * `mediaFolder` fără slash inițial, ex. `portofoliu/2S+P+11E Bucuresti`
 */
export function scanProjectMedia(mediaFolder: string | undefined | null): ProjectMedia {
  if (!mediaFolder?.trim()) {
    return { cover: '', gallery: [] };
  }

  const clean = mediaFolder.replace(/^\/+|\/+$/g, '');
  const dir = path.join(process.cwd(), 'public', clean);

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return { cover: '', gallery: [] };
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f) && fs.statSync(path.join(dir, f)).isFile());

  files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));

  const coverFile = files.find((f) => COVER_NAME.test(f));
  const rel = clean.replace(/\\/g, '/');
  const cover = coverFile ? `/${rel}/${coverFile}` : '';
  const gallery = files.filter((f) => f !== coverFile).map((f) => `/${rel}/${f}`);

  return { cover, gallery };
}

/** Dacă există `mediaFolder`, folosește scanarea; altfel păstrează cover/gallery din frontmatter (legacy). */
export function resolveProjectMedia(data: {
  mediaFolder?: string;
  cover?: string;
  gallery?: string[];
}): ProjectMedia {
  if (data.mediaFolder?.trim()) {
    return scanProjectMedia(data.mediaFolder);
  }
  return {
    cover: data.cover?.trim() ?? '',
    gallery: data.gallery ?? []
  };
}
