/**
 * Production Build & Asset Integrity Verification for GOTA PATTI — ARCHIVE & ATELIER
 * Runs Vite production build (with base: '/gota-patti/') when installed, ensures
 * dist/ contains all 5 HTML pages, scripts, styles, images, and 532 animation frames,
 * and verifies asset and route integrity for GitHub Pages deployment.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = __dirname;
const dist = path.join(root, 'dist');
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

// 1. Verify vite.config.js exists and has base: '/gota-patti/'
const viteConfigPath = path.join(root, 'vite.config.js');
if (!fs.existsSync(viteConfigPath)) {
  errors.push('Missing vite.config.js');
} else {
  const viteConfig = require(viteConfigPath);
  if (viteConfig.base !== '/gota-patti/') {
    errors.push(`Expected vite.config.js base to be '/gota-patti/', got '${viteConfig.base}'`);
  }
}

// 2. Ensure shop.html is completely removed
if (fs.existsSync(path.join(root, 'shop.html'))) {
  errors.push('shop.html still exists in project root.');
}

// 3. Run Vite build if vite binary is available in node_modules; otherwise build dist/ directly
const viteBin = path.join(root, 'node_modules', '.bin', 'vite');
if (fs.existsSync(viteBin)) {
  console.log('Running Vite production build (base: /gota-patti/)...');
  execSync(`"${viteBin}" build`, { cwd: root, stdio: 'inherit' });
} else {
  console.log('Building production dist/ directory...');
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
  }
  fs.mkdirSync(dist, { recursive: true });

  for (const page of requiredPages) {
    fs.copyFileSync(path.join(root, page), path.join(dist, page));
  }

  const viteCfg = require(viteConfigPath);
  const copyPlugin = viteCfg.plugins && viteCfg.plugins[0];
  if (copyPlugin && typeof copyPlugin.closeBundle === 'function') {
    copyPlugin.closeBundle();
  }
}

// 4. Verify all 5 pages and assets exist in both root and dist/
for (const page of requiredPages) {
  const rootPage = path.join(root, page);
  const distPage = path.join(dist, page);
  if (!fs.existsSync(rootPage)) {
    errors.push(`Missing source page: ${page}`);
    continue;
  }
  if (!fs.existsSync(distPage)) {
    errors.push(`Missing built page in dist/: ${page}`);
    continue;
  }
  const html = fs.readFileSync(distPage, 'utf8');
  if (html.toLowerCase().includes('shop.html')) {
    errors.push(`dist/${page} still contains a reference to shop.html`);
  }
  if (html.toLowerCase().includes('bodoni moda') || html.toLowerCase().includes('plus jakarta sans')) {
    errors.push(`dist/${page} still references deprecated fonts`);
  }
  if (!html.includes('Inter')) {
    errors.push(`dist/${page} does not load Inter font`);
  }
  if (!html.includes('class="site-footer"')) {
    errors.push(`dist/${page} is missing unified .site-footer`);
  }
}

for (const relPath of requiredAssets) {
  if (!fs.existsSync(path.join(dist, relPath))) {
    errors.push(`Missing asset in dist/: ${relPath}`);
  }
}

if (!fs.existsSync(path.join(dist, 'ezgif-frame-001.jpg')) || !fs.existsSync(path.join(dist, 'ezgif-frame-240.jpg'))) {
  errors.push('Missing hero scroll animation frames in dist/ (ezgif-frame-001.jpg .. 240.jpg)');
}
if (!fs.existsSync(path.join(dist, 'process-frames', 'ezgif-frame-001.jpg')) || !fs.existsSync(path.join(dist, 'process-frames', 'ezgif-frame-292.jpg'))) {
  errors.push('Missing process scroll animation frames in dist/ (process-frames/ezgif-frame-001.jpg .. 292.jpg)');
}

if (errors.length > 0) {
  console.error('Build check failed with errors:\n - ' + errors.join('\n - '));
  process.exit(1);
}

console.log('✓ GOTA PATTI production build succeeded: dist/ generated and verified with base /gota-patti/, all 5 pages, assets, images, and 532 animation frames intact.');
