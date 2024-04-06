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

  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + ((1 << 8) + Math.round(a * 255)).toString(16).slice(1);

  return `#${hex}`.toUpperCase();
}

function objectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export {
  getUniqueId,
  minmax,
  randomRange,
  rgbaToHex,
  objectsEqual,
};
