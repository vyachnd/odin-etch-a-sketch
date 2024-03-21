/*
  type: outlined, rounded, sharp
  Fill: 0, 1
  Weight: 100, 200, 300, 400, 500, 600, 780
  Grade: -25, 0, 200
  Optical Size: 20px, 24px, 40px, 48px
*/

class CustomIcon {
  constructor(parent, options) {
    this.parent = parent || null;
    this.options = {
      type: 'outlined',
      fill: false,
      wght: 400,
      grad: 0,
      opsz: 24,
      icon: 'circle',
      cls: [],
      ...options,
    };
    this.elements = new Map();
  }

  get target() { return this.elements.get('icon'); }

  setType(type) {
    this.options.type = type;
    this.update();
  }

  toggleFill() {
    this.options.fill = !this.options.fill;
    this.update();
  }

  setWght(wght) {
    this.options.wght = Math.max(100, Math.min(780, wght));
    this.update();
  }

  setGrad(grad) {
    this.options.grad = Math.max(-25, Math.min(200, grad));
    this.update();
  }

  setOpsz(opsz) {
    this.options.opsz = Math.max(20, Math.min(48, opsz));
    this.update();
  }

  setIcon(icon) {
    this.options.icon = icon;
    this.update();
  }

  destroy() {
    const icon = this.elements.get('icon');

    if (icon) icon.remove();

    this.elements.clear();
  }

  update() {
    const icon = this.elements.get('icon');

    if (!icon) return null;

    if (icon.classList.length > 0) icon.className = '';
    if (this.options.type === 'outlined') icon.classList.add(`material-symbols-outlined`);
    if (this.options.type === 'rounded') icon.classList.add(`material-symbols-rounded`);
    if (this.options.type === 'sharp') icon.classList.add(`material-symbols-sharp`);
    icon.classList.add(...this.options.cls);

    icon.textContent = this.options.icon;

    icon.style.fontVariationSettings = `
      'FILL' ${+this.options.fill},
      'wght' ${this.options.wght},
      'GRAD' ${this.options.grad},
      'opsz' ${this.options.opsz}
    `;
  }

  render() {
    if (!this.parent) return null;

    if (!this.elements.has('icon')) {
      const icon = document.createElement('span');
      this.elements.set('icon', icon);

      this.update();

      this.parent.append(icon);
    }

    this.update();
  }
}

export default CustomIcon;
