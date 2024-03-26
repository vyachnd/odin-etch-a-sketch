import debounce from '../../../libraries/debounce.js';
import Emitter from '../../../libraries/emitter.js';

class CustomHeader {
  constructor(options) {
    this.options = {
      icon: null,
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.updateDebounce = debounce(this.update.bind(this), 100);
  }

  get target() { return this.elements.get('header'); }

  update() {
    const header = this.elements.get('header');

    if (!header) return null;

    if (header.classList.length > 0) header.className = '';
    header.classList.add('custom-header', ...this.options.cls);
  }

  destroy() {
    const header = this.elements.get('header');

    if (header) header.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent) return null;

    let header = this.elements.get('header');

    if (!header) {
      header = document.createElement('div');
      this.elements.set('header', header);

      const container = document.createElement('div');
      container.classList.add('custom-header__container');

      const heading = document.createElement('h1');
      heading.classList.add('custom-header__heading');
      heading.textContent = this.options.heading;
      this.elements.set('heading', heading);

      const subheading = document.createElement('span');
      subheading.classList.add('custom-header__subheading');
      subheading.textContent = this.options.subheading;
      this.elements.set('subheading', subheading);

      if (this.options.url) {
        const linkPart = subheading.textContent.match('\\$\\{(.+)\\}');
        const link = `<a class="custom-header__link" href="${this.options.url}" target="_blank">${linkPart[1]}</a>`;

        subheading.innerHTML = subheading.innerHTML.replace(linkPart[0], link);

        this.elements.set('link', link);
      }

      if (this.options.icon) {
        this.options.icon.options.cls.push('custom-header__icon');
        this.options.icon.render(header);
        this.elements.set('icon', this.options.icon);
      }

      container.append(heading, subheading);
      header.append(container);
    }

    this.parent = parent;
    this.parent.append(header);

    this.update();
  }
}

export default CustomHeader;
