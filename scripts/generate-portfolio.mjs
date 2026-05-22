import fs from 'node:fs';
import path from 'node:path';

const BASE_DIR = path.join(process.cwd(), 'public', 'portofoliu');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'portfolio-media.json');

function isImage(file) {
  return /\.(jpe?g|png|webp|gif|avif)$/i.test(file);
}

function scan() {
  const result = {};

  if (!fs.existsSync(BASE_DIR)) return result;

  const folders = fs.readdirSync(BASE_DIR);

  for (const folder of folders) {
    const folderPath = path.join(BASE_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs
      .readdirSync(folderPath)
      .filter(isImage)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const cover =
      files.find((f) => /^cover\./i.test(f)) || files[0] || '';

    const mediaFolder = `portofoliu/${folder}`;
    result[mediaFolder] = {
      cover: cover ? `/portofoliu/${folder}/${cover}` : '',
      gallery: files
        .filter((f) => f !== cover)
        .map((f) => `/portofoliu/${folder}/${f}`)
    };
  }

  return result;
}

function main() {
  const data = scan();

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');

  console.log('Portfolio media generated:', OUTPUT_FILE);
}

main();