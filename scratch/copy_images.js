const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\77e3f67c-6e25-488b-9031-96a4b9a00b51';
const destDir = path.join(process.cwd(), 'public', 'images');

// Backup old blurry images first
const backupDir = path.join(process.cwd(), 'public', 'images', 'lowres-backup');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

const mappings = [
  { src: 'hero_hd_1790718738381.jpg', target: 'hero.jpg', hd: 'hero-hd.jpg' },
  { src: 'dance_hd_1790718760887.jpg', target: 'dance.jpg', hd: 'dance-hd.jpg' },
  { src: 'naiwave_hd_1790718789958.jpg', target: 'naiwave.jpg', hd: 'naiwave-hd.jpg' },
  { src: 'podcast_host_hd_1790718820800.jpg', target: 'podcast-tall.jpg', hd: 'podcast-tall-hd.jpg' },
  { src: 'community_tall_hd_1790718854971.jpg', target: 'one.jpeg', hd: 'community-dance-tall.jpg' },
];

for (const m of mappings) {
  const sourcePath = path.join(srcDir, m.src);
  const targetPath = path.join(destDir, m.target);
  const hdPath = path.join(destDir, m.hd);
  
  if (fs.existsSync(targetPath)) {
    fs.copyFileSync(targetPath, path.join(backupDir, m.target));
  }
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    fs.copyFileSync(sourcePath, hdPath);
    console.log(`Updated ${m.target} and created ${m.hd} from ${m.src}`);
  } else {
    console.error(`Missing source: ${sourcePath}`);
  }
}
