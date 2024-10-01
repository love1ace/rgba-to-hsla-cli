#!/usr/bin/env node

const rgbaToHsla = (r, g, b, a = 1) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l, a };
};

const [r, g, b, aValue] = process.argv.slice(2).map(Number);
const a = parseFloat(aValue) || 1;

if ([r, g, b].some((value) => isNaN(value) || value < 0 || value > 255)) {
  console.error("Invalid RGB values. Please provide RGB values between 0 and 255.");
  process.exit(1);
}

if (isNaN(a) || a < 0 || a > 1) {
  console.error("Invalid alpha value. Alpha should be between 0 and 1.");
  process.exit(1);
}

const { h, s, l, a: alpha } = rgbaToHsla(r, g, b, a);

console.log(`RGBA: (${r}, ${g}, ${b}, ${alpha})`);
console.log(`HSLA: (${h}°, ${s}%, ${l}%, ${alpha})`);

console.log(`\x1b[48;2;${r};${g};${b}m   COLOR   \x1b[0m`);
console.log(`Alpha: ${a} (not visible in ANSI)`);