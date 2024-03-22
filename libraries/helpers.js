function getUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function randomRange(from, to) {
  return Math.random() * (to - from) + from;
}

export {
  getUniqueId,
  randomRange,
};
