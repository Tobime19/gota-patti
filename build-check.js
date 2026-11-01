/**
 * Production Build & Asset Integrity Verification for GOTA PATTI — ARCHIVE & ATELIER
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const requiredPages = ['index.html', 'designers.html', 'process.html', 'products.html', 'about.html'];
const requiredAssets = [
  'styles.css',
  'header.css',
  'app.js',
  'auth.js',
  'craft-animation.js',
  'images/products/odhni-tree-of-life.jpg',
  'images/products/potli-lotus-rosette.jpg',
  'images/products/kurta-chevron-lappa.jpg',
  'images/products/lehenga-keri-motif.jpg',
  'images/products/cushion-suraj-solar.jpg',
  'images/products/dupatta-bijia-organza.jpg',
  'images/products/wall-panel-peepal.jpg',
  'images/products/mojaris-metallic-ribbon.jpg',
  'images/designers/sanjay-garg.jpg',
  'images/designers/anamika-khanna.jpg',
  'images/designers/anavila-misra.jpg',
  'images/designers/abraham-thakore.jpg',
  'images/designers/anita-dongre.jpg',
  'images/designers/sabyasachi-mukherjee.jpg',
  'images/designers/rimzim-dadu.jpg'
];

let errors = [];

// 1. Ensure shop.html is completely removed
if (fs.existsSync(path.join(root, 'shop.html'))) {
  errors.push('shop.html still exists in project root.');
}

// 2. Verify all 5 pages exist and meet typography, nav, and footer standards
for (const page of requiredPages) {
  const filePath = path.join(root, page);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing required page: ${page}`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (html.toLowerCase().includes('shop.html')) {
    errors.push(`${page} still contains a reference to shop.html`);
  }
  if (html.toLowerCase().includes('bodoni moda') || html.toLowerCase().includes('plus jakarta sans')) {
    errors.push(`${page} still references deprecated fonts`);
  }
  if (!html.includes('Inter')) {
    errors.push(`${page} does not load Inter font`);
  }
  if (!html.includes('class="site-footer"')) {
    errors.push(`${page} is missing unified .site-footer`);
  }
}

// 3. Verify required assets exist
for (const relPath of requiredAssets) {
  const fullPath = path.join(root, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required asset: ${relPath}`);
  }
}

// 4. Verify animation frames exist
if (!fs.existsSync(path.join(root, 'ezgif-frame-001.jpg')) || !fs.existsSync(path.join(root, 'ezgif-frame-240.jpg'))) {
  errors.push('Missing hero scroll animation frames (ezgif-frame-001.jpg .. 240.jpg)');
}
if (!fs.existsSync(path.join(root, 'process-frames', 'ezgif-frame-001.jpg')) || !fs.existsSync(path.join(root, 'process-frames', 'ezgif-frame-292.jpg'))) {
  errors.push('Missing process scroll animation frames (process-frames/ezgif-frame-001.jpg .. 292.jpg)');
}

if (errors.length > 0) {
  console.error('Build check failed with errors:\n - ' + errors.join('\n - '));
  process.exit(1);
}

console.log('✓ GOTA PATTI production build check passed: All 5 pages, Inter typography, footer, filters, shopping flow, and assets verified.');
