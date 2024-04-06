function getUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
