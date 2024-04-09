class CustomDivider {
  constructor(options) {
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
  }

  get target() { return this.elements.get('divider'); }

  destroy() {
    const divider = this.elements.get('divider');

    if (divider) divider.remove();

    this.elements.clear();
  }

  update() {
    const divider = this.elements.get('divider');

    if (!divider) return null;

    if (divider.classList.length > 0) divider.className = '';
    divider.classList.add('custom-divider', ...this.options.cls);
  }

  render(parent) {
    if (!parent) return null;

    let divider = this.elements.get('divider');

    if (!divider) {
      divider = document.createElement('hr');
      this.elements.set('divider', divider);
    }

    this.parent = parent;
    this.parent.append(divider);

    this.update();
  }
}

export default CustomDivider;
