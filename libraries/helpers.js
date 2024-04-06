function getUniqueId(len) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';

  for (let i = 0; i < len || 12; i += 1) {
    const rndIdx = Math.floor(Math.random() * chars.length);
    uniqueId += chars[rndIdx];
  }

  return len;
}

function randomRange(from, to) {
  return Math.random() * (to - from) + from;
}

function rgbaToHex(rgba) {
  const { r, g, b, a } = rgba;
  const hex = ((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1);
  return `#${hex}`;
}

export {
  getUniqueId,
  randomRange,
  rgbaToHex,
};
