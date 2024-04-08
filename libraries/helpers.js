function getUniqueId(len = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';

  for (let i = 0; i < len; i += 1) {
    const rndIdx = Math.floor(Math.random() * chars.length);
    uniqueId += chars[rndIdx];
  }

  return uniqueId;
}

function minmax(value, min, max) { return Math.min(Math.max(value, min), max); }

function randomRange(from, to) {
  return Math.random() * (to - from) + from;
}

function rgbaToHex(rgba) {
  const r = Math.round(rgba.r);
  const g = Math.round(rgba.g);
  const b = Math.round(rgba.b);
  const a = Math.round(rgba.a * 255);

  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + ((1 << 8) + a).toString(16).slice(1);

  return `#${hex}`.toUpperCase();
}

function hexToRgba(hex) {
  const hexClr = hex.replace('#', '');
  const rgba = {
    r: parseInt(hexClr.slice(0, 2), 16),
    g: parseInt(hexClr.slice(2, 4), 16),
    b: parseInt(hexClr.slice(4, 6), 16),
    a: +(parseInt(hexClr.slice(6, 16) || 'ff', 16) / 255).toFixed(2),
  };

  return rgba;
}

function adjustColor(color, percent) {
  const { r, g, b, a } = color;

  const adjustComponent = (clr) => {
    if (percent < 0 && clr === 0) return 0;
    if (percent > 0 && clr === 255) return 255;

    let delta = Math.round(percent / 100 * clr);

    if (percent > 0 && delta === 0) delta = Math.max(1, delta);
    if (percent < 0 && delta === 0) delta = Math.min(-1, delta);

    return minmax(clr + delta, 0, 255);
  };

  return {
    r: adjustComponent(r),
    g: adjustComponent(g),
    b: adjustComponent(b),
    a: a,
  };
}

function objectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export {
  getUniqueId,
  minmax,
  randomRange,
  rgbaToHex,
  hexToRgba,
  adjustColor,
  objectsEqual,
};
