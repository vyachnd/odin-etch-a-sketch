function debounce(fn, delay) {
  let timeoutId;

  return function () {
    const self = this;
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(self, args), delay);
  };
}

export default debounce;
