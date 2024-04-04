
import debounce from '../../../libraries/debounce.js';

class ThumbRender {
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
    this.emitter.on('move', this.update);
    this.emitter.on('show', this.update);
    this.emitter.on('hide', this.update);
  }

  get emitter() { return this._entity.emitter; }
  get target() { return this.elements.get('thumb'); }

  update() {
    const thumb = this.elements.get('thumb');

    if (!this._entity.enabled) {
      this.destroy();
    } else {
      if (!thumb) this.render(this.parent);
    }

    if (!thumb || !this._entity) return null;

    const size = this._entity.size;
    const scale = this._entity.scale;
    const position = this._entity.position;
    const showed = this._entity.showed;

    if (thumb.classList.length > 0) thumb.className = '';
    thumb.classList.add('thumb', ...this.options.cls);

    thumb.style.width = `${size}px`;
    thumb.style.height = `${size}px`;
    thumb.style.transform = `scale(${scale})`;

    thumb.style.top = `${position.y}px`;
    thumb.style.left = `${position.x}px`;

    thumb.style.display = showed ? 'block' : 'none';
  }

  destroy() {
    const thumb = this.elements.get('thumb');

    if (thumb) thumb.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent && !this.thumb) return null;

    let thumb = this.elements.get('thumb');

    if (!thumb) {
      thumb = document.createElement('div');
      this.elements.set('thumb', thumb);
    }

    this.update();

    this.parent = parent;
    this.parent.append(thumb);
  }
}

export default ThumbRender;
