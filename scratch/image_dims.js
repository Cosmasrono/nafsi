const fs = require('fs');
const path = require('path');

function getJpegDimensions(buf) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] === 0xFF && (buf[i + 1] >= 0xC0 && buf[i + 1] <= 0xC3)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (buf[i] === 0xFF && buf[i + 1] === 0xDA) break; // SOS
    if (buf[i] === 0xFF) {
      const len = buf.readUInt16BE(i + 2);
      i += 2 + len;
    } else {
      i++;
    }
  }
  return null;
}

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg)$/i.test(f));
for (const file of files) {
  const filePath = path.join(dir, file);
  const buf = fs.readFileSync(filePath);
  const dims = getJpegDimensions(buf);
  const size = (buf.length / 1024).toFixed(1);
  console.log(`${file.padEnd(25)} ${size.padStart(8)} KB   ${dims ? `${dims.width}x${dims.height}` : 'unknown'}`);
}
