/*
  type: outlined, rounded, sharp
  Fill: 0, 1
  Weight: 100, 200, 300, 400, 500, 600, 780
  Grade: -25, 0, 200
  Optical Size: 20px, 24px, 40px, 48px
*/

import debounce from '../../../libraries/debounce.js';

class CustomIcon {
  constructor(options) {
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
    this.parent = null;
    this.elements = new Map();

    this.updateDebounce = debounce(this.update.bind(this), 100);
  }

  get target() { return this.elements.get('icon'); }

  setOptions(options) {
    for (const option in options) {
      if (this.options.hasOwnProperty(option)) {
        this.options[option] = options[option];

        this.update();
      }
    }
  }

  update() {
    const icon = this.elements.get('icon');

    if (!icon) return null;

    if (icon.classList.length > 0) icon.className = '';
    if (this.options.type === 'outlined') icon.classList.add(`material-symbols-outlined`);
    if (this.options.type === 'rounded') icon.classList.add(`material-symbols-rounded`);
    if (this.options.type === 'sharp') icon.classList.add(`material-symbols-sharp`);
    icon.classList.add('custom-icon', ...this.options.cls);

    icon.textContent = this.options.icon;

    icon.style.fontVariationSettings = `
      'FILL' ${+this.options.fill},
      'wght' ${this.options.wght},
      'GRAD' ${this.options.grad},
      'opsz' ${this.options.opsz}
    `;
  }

  destroy() {
    const icon = this.elements.get('icon');

    if (icon) icon.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent) return null;

    let icon = this.elements.get('icon');

    if (!icon) {
      icon = document.createElement('span');
      this.elements.set('icon', icon);
    }

    this.update();

    this.parent = parent;
    this.parent.append(icon);
  }
}

export default CustomIcon;
