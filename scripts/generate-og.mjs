import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const W = 1200;
const H = 630;

const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="#0f0f23"/>
      <stop offset="100%" stop-color="#05050a"/>
    </radialGradient>
    <linearGradient id="nebula" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <ellipse cx="${W * 0.82}" cy="${H * 0.78}" rx="420" ry="320" fill="url(#nebula)"/>
  <ellipse cx="${W * 0.15}" cy="${H * 0.1}" rx="300" ry="220" fill="url(#nebula)"/>
</svg>
`);

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="${W / 2}" y="${H / 2 + 200}" text-anchor="middle"
        font-family="'Onest','Segoe UI',system-ui,sans-serif"
        font-size="72" font-weight="700" fill="#e2e8f0" letter-spacing="1">
    <tspan fill="#60a5fa">bray</tspan>dev<tspan fill="#a78bfa">.</tspan>
  </text>
</svg>
`);

const { data: base } = await sharp(background).png().toBuffer({ resolveWithObject: true });

const logo = await sharp(path.join(root, 'public', 'logo.svg'))
  .resize({ width: 360 })
  .png()
  .toBuffer();

const banner = await sharp(base)
  .composite([
    { input: logo, gravity: 'centre' },
    { input: text, gravity: 'south', top: 0, left: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(root, 'public', 'og-banner.png'));

console.log(`og-banner.png generado: ${banner.width}x${banner.height}`);
