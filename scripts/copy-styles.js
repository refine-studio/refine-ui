import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// The published stylesheet brings its own fonts, so `dist/fonts` is the one folder an app copies when it bundles its own styles.
const require = createRequire(import.meta.url);
const fontPackages = ['@fontsource-variable/geist', '@fontsource-variable/geist-mono'];
const fontsDirectory = 'dist/fonts';

mkdirSync(fontsDirectory, { recursive: true });

const inlineFontPackage = (stylesheet, packageName) => {
  const importLine = `@import "${packageName}";`;

  if (!stylesheet.includes(importLine)) {
    throw new Error(`src/styles/refine-ui.css no longer imports ${packageName}. Update scripts/copy-styles.js.`);
  }

  const packageDirectory = dirname(require.resolve(`${packageName}/package.json`));
  const fontFaces = readFileSync(join(packageDirectory, 'index.css'), 'utf8').replaceAll(
    /url\(\.\/files\/([^)]+)\)/g,
    (_match, fileName) => {
      copyFileSync(join(packageDirectory, 'files', fileName), join(fontsDirectory, fileName));
      return `url(./fonts/${fileName})`;
    },
  );
  copyFileSync(join(packageDirectory, 'LICENSE'), join(fontsDirectory, `${packageName.split('/')[1]}.LICENSE`));

  return stylesheet.replace(importLine, fontFaces.trim());
};

// The published stylesheet scans the compiled components next to it, so consumers never configure `@source` themselves.
const source = fontPackages.reduce(inlineFontPackage, readFileSync('src/styles/refine-ui.css', 'utf8'));
writeFileSync('dist/styles.css', `@source './';\n\n${source}`);
