function hslToHex(h, s, l) {
  // Convert HSL values to the range 0-1
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);

  // Convert the RGB values to the range 0-255
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  // Convert the RGB values to hexadecimal and return the hex code
  const toHex = (x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function generateColorScale(n) {
  const colors = [];
  const step = 360 / n; // Spread hues evenly across the color wheel

  for (let i = 0; i < n; i++) {
    const h = (i * step) / 360; // Convert to a value between 0 and 1
    const s = 1; // Full saturation
    const l = 0.5; // 50% lightness
    console.log([h * 360, s * 100, l * 100])
    const hex = hslToHex(h * 360, s * 100, l * 100);
    colors.push(hex);
  }

  return colors;
}
