const fs = require('fs');
const path = require('path');

/**
 * Custom Vite plugin to ensure all static scripts, stylesheets, images,
 * and scroll animation frame sequences (240 hero frames + 292 process frames)
 * are copied into dist/ alongside Vite's bundled HTML output.
 */
function copyStaticArchiveAssets() {
  return {
    name: 'copy-static-archive-assets',
    closeBundle() {
      const root = __dirname;
      const dist = path.resolve(root, 'dist');
      if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist, { recursive: true });
      }

      // Copy standalone runtime scripts and stylesheets
      const staticFiles = [
        'app.js',
        'auth.js',
        'craft-animation.js',
        'styles.css',
        'header.css'
      ];
      for (const file of staticFiles) {
        const src = path.join(root, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(dist, file));
        }
      }

      // Copy images/ and process-frames/ directories recursively
      const copyDirRecursive = (srcDir, destDir) => {
        if (!fs.existsSync(srcDir)) return;
        fs.mkdirSync(destDir, { recursive: true });
        for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
          if (entry.name.startsWith('.')) continue;
          const s = path.join(srcDir, entry.name);
          const d = path.join(destDir, entry.name);
          if (entry.isDirectory()) {
            copyDirRecursive(s, d);
          } else {
            fs.copyFileSync(s, d);
          }
        }
      };

      copyDirRecursive(path.join(root, 'images'), path.join(dist, 'images'));
      copyDirRecursive(path.join(root, 'process-frames'), path.join(dist, 'process-frames'));

      // Copy 240 hero animation frames (ezgif-frame-001.jpg .. 240.jpg)
      for (const entry of fs.readdirSync(root)) {
        if (/^ezgif-frame-\d+\.jpg$/i.test(entry)) {
          fs.copyFileSync(path.join(root, entry), path.join(dist, entry));
        }
      }

      // Add .nojekyll for GitHub Pages
      fs.writeFileSync(path.join(dist, '.nojekyll'), '');
    }
  };
}

module.exports = {
  base: '/gota-patti/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        designers: path.resolve(__dirname, 'designers.html'),
        process: path.resolve(__dirname, 'process.html'),
        products: path.resolve(__dirname, 'products.html'),
        about: path.resolve(__dirname, 'about.html')
      }
    }
  },
  plugins: [copyStaticArchiveAssets()]
};
