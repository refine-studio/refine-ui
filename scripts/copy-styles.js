import { readFileSync, writeFileSync } from 'node:fs';

// The published stylesheet scans the compiled components next to it, so consumers never configure `@source` themselves.
const source = readFileSync('src/styles/refine-ui.css', 'utf8');
writeFileSync('dist/styles.css', `@source './';\n\n${source}`);
