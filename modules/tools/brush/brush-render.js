
import debounce from '../../../libraries/debounce.js';

class BrushRender {
  constructor(entity, options) {
    this._entity = entity;
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();

    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.update = this.update.bind(this);

    this.emitter.on('enable', () => this.updateDebounce());
    this.emitter.on('disable', () => this.updateDebounce());
    this.emitter.on('toggle', () => this.updateDebounce());
  }

  get emitter() { return this._entity.emitter; }
  get target() { return this.elements.get('brush'); }

  update() {
    const brush = this.elements.get('brush');

    if (!this._entity.enabled) {
      this.destroy();
    } else {
      if (!brush) this.render(this.parent);
    }

    if (!brush || !this._entity) return null;

    if (brush.classList.length > 0) brush.className = '';
    brush.classList.add('brush', ...this.options.cls);
  }

  destroy() {
    const brush = this.elements.get('brush');

    if (brush) brush.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent && !this.brush) return null;

    let brush = this.elements.get('brush');

    if (!brush) {
      brush = document.createElement('div');
      this.elements.set('brush', brush);
    }

    this.update();

    this.parent = parent;
    this.parent.append(brush);
  }
}

export default BrushRender;
