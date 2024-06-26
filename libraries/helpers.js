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

function rgbToHex(rgba, alpha) {
  const r = Math.round(rgba.r);
  const g = Math.round(rgba.g);
  const b = Math.round(rgba.b);

  let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  if (alpha) hex += ((1 << 8) + Math.round(alpha * 255)).toString(16).slice(1);

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
  const { r, g, b, a = 1 } = color;

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

function assignMethodsToElement(element, classInstance) {
  let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));

  methods = methods.filter((method) => method !== 'constructor' && typeof classInstance[method] === 'function');

  methods.forEach(method => {
    element[method] = function (...args) {
      classInstance[method](...args);
    };
  });
}

function deepCopyMap(orig) {
  const copy = new Map();

  orig.forEach((value, key) => {
    if (value instanceof Map) {
      copy.set(key, deepCopyMap(value));
    } else if (typeof value === 'object' && value !== null) {
      copy.set(key, deepCopyObject(value));
    } else {
      copy.set(key, value);
    }
  });

  return copy;
}

function deepCopyObject(orig) {
  const copy = {};

  for (const [key, value] of Object.entries(orig)) {
    if (value instanceof Map) {
      copy[key] = deepCopyMap(value);
    } else if (typeof value === 'object' && value !== null) {
      copy[key] = deepCopyObject(value);
    } else {
      copy[key] = value;
    }
  }
  return copy;
}

function distance(pos1, pos2) {
  const { x: x1, y: y1 } = pos1;
  const { x: x2, y: y2 } = pos2;

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export {
  getUniqueId,
  minmax,
  randomRange,
  rgbToHex,
  hexToRgba,
  adjustColor,
  objectsEqual,
  assignMethodsToElement,
  deepCopyMap,
  deepCopyObject,
  distance,
};
