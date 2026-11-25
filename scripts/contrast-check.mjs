// Contrast check: reads every light-dark() token pair from assets/styles.css
// and verifies both themes. Text pairs need WCAG AA 4.5:1; UI marks need 3:1.
// Exits 1 on any failure.
import { readFileSync } from 'node:fs';

const css = readFileSync('assets/styles.css', 'utf8');
const tokens = {};
for (const m of css.matchAll(/--([\w-]+):\s*light-dark\(\s*(#[0-9a-fA-F]{6})\s*,\s*(#[0-9a-fA-F]{6})\s*\)/g)) {
  tokens[m[1]] = { light: m[2], dark: m[3] };
}

function luminance(hex) {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT = 4.5;
const UI = 3;

const pairs = [
  ['ink', 'bg', TEXT, 'body text on page'],
  ['ink', 'bg-alt', TEXT, 'body text on panels'],
  ['ink', 'bg-hi', TEXT, 'text on highlight'],
  ['ink-deep', 'bg', TEXT, 'emphasized text on page'],
  ['ink-deep', 'bg-alt', TEXT, 'emphasized text on panels'],
  ['dim', 'bg', TEXT, 'secondary text on page'],
  ['dim', 'bg-alt', TEXT, 'secondary text on panels'],
  ['bg', 'ink', TEXT, 'inverted selection text'],
  ['accent', 'bg', UI, 'accent UI marks (square, outline)'],
];

let failures = 0;

for (const theme of ['light', 'dark']) {
  console.log(`\n${theme.toUpperCase()} THEME`);
  for (const [fg, bg, min, where] of pairs) {
    const f = tokens[fg] ? tokens[fg][theme] : null;
    const b = tokens[bg] ? tokens[bg][theme] : null;
    if (!f || !b) {
      console.log(`SKIP  -        ${fg} on ${bg} (token missing)`);
      continue;
    }
    const ratio = contrast(f, b);
    const pass = ratio >= min;
    if (!pass) failures++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  ${fg} on ${bg}  (${where})`);
  }
}

console.log(`\n${failures} failure${failures === 1 ? '' : 's'} across ${pairs.length * 2} checks`);
process.exit(failures ? 1 : 0);
