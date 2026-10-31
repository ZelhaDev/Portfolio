// Contrast check: reads every hex token from src/styles/tokens.css and verifies
// every text pair used on the site against WCAG AA (4.5:1). Exits 1 on failure.
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/tokens.css', 'utf8');
const tokens = {};
for (const m of css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
  tokens[m[1]] = m[2];
}

function luminance(hex) {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    let v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

const pairs = [
  ['text', 'bg', 'body text on page'],
  ['text', 'surface', 'body text on cards'],
  ['text', 'surface-raised', 'body text on raised surfaces'],
  ['text-secondary', 'bg', 'secondary text on page'],
  ['text-secondary', 'surface', 'secondary text on cards'],
  ['text-secondary', 'surface-raised', 'secondary text on tags'],
  ['text-muted', 'bg', 'muted text on page'],
  ['text-muted', 'surface', 'muted text on cards'],
  ['text-muted', 'surface-raised', 'muted text on raised surfaces'],
  ['accent', 'bg', 'amber links on page'],
  ['accent', 'surface', 'amber links on cards'],
  ['accent-contrast', 'accent', 'text on amber buttons'],
  ['accent-2', 'bg', 'cyan accents on page'],
  ['accent-2', 'surface', 'cyan accents on cards'],
  ['accent-2-contrast', 'accent-2', 'text on cyan badges'],
];

let failures = 0;
console.log('Contrast check (WCAG AA, 4.5:1 minimum)\n');
for (const [fg, bg, where] of pairs) {
  if (!tokens[fg] || !tokens[bg]) {
    console.log(`SKIP  -        ${fg} on ${bg} (token missing)`);
    continue;
  }
  const ratio = contrast(tokens[fg], tokens[bg]);
  const pass = ratio >= 4.5;
  if (!pass) failures++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  ${fg} on ${bg}  (${where})`);
}
console.log(`\n${failures} failure${failures === 1 ? '' : 's'} across ${pairs.length} pairs`);
process.exit(failures ? 1 : 0);
