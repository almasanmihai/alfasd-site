import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const json = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/portfolio-media.json'), 'utf8')
);
const mdDir = path.join(root, 'src/content/projects');

const missingKeys = [];
const missingFiles = [];

for (const file of fs.readdirSync(mdDir).filter((f) => f.endsWith('.md'))) {
  const raw = fs.readFileSync(path.join(mdDir, file), 'utf8');
  const m = raw.match(/mediaFolder:\s*(.+)/);
  if (!m) continue;
  let key = m[1].trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  if (!json[key]) {
    missingKeys.push({ file, key });
    continue;
  }
  const media = json[key];
  for (const p of [media.cover, ...(media.gallery || [])].filter(Boolean)) {
    const disk = path.join(root, 'public', p.replace(/^\//, ''));
    if (!fs.existsSync(disk)) missingFiles.push({ file, path: p });
  }
}

console.log('Projects in JSON:', Object.keys(json).length);
if (missingKeys.length) {
  console.log('ERROR: mediaFolder fără intrare în portfolio-media.json:');
  missingKeys.forEach((x) => console.log(`  ${x.file} -> ${x.key}`));
}
if (missingFiles.length) {
  console.log(`ERROR: ${missingFiles.length} imagini lipsă pe disc (primele 20):`);
  missingFiles.slice(0, 20).forEach((x) => console.log(`  ${x.path}`));
}
if (!missingKeys.length && !missingFiles.length) {
  console.log('OK: toate proiectele și imaginile din JSON există.');
}
process.exit(missingKeys.length || missingFiles.length ? 1 : 0);
