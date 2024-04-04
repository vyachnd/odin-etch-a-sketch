import debounce from '../libraries/debounce.js';

class Plate {
  constructor(options) {
    this.options = {
      cls: [],
      ...options,
    };
    this.elements = new Map();

    this.updateDebounce = debounce(this.update.bind(this), 100);
  }

  get target() { return this.elements.get('plate'); }

  addElement(element, name) {
    const userElements = this.elements.get('user-elements');
    const elementName = name || element?.constructor?.name;

    userElements.set(elementName, element);
    this.update();
  }

  update() {
    const plate = this.elements.get('plate');
    const userElements = this.elements.get('user-elements');

    if (!plate) return null;

    if (plate.classList.length > 0) plate.className = '';
    plate.classList.add('plate', ...this.options.cls);

    for (const [, element] of userElements) {
      if (!element.target) element.render(plate);
      if (element.target) element.update();
    }
  }

  destroy() {
    const plate = this.elements.get('plate');

    this.elements.forEach((element) => {
      if (element.remove) element.remove();
      if (element.destroy) element.destroy();
    });

    if (plate) plate.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent) return null;

    let plate = this.elements.get('plate');

    if (!plate) {
      plate = document.createElement('div');
      this.elements.set('plate', plate);

      this.elements.set('user-elements', new Map());
    }

    this.update();

    this.parent = parent;
    this.parent.append(plate);
  }
}

export default Plate;
