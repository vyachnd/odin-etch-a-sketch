
import debounce from '../../../libraries/debounce.js';
import Emitter from '../../../libraries/emitter.js';

class DragRender {
  constructor(entity, options) {
    this.entity = entity;
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.updateDebounce = debounce(this.update.bind(this), 100);
  }

  update() { }

  destroy() { }

  render(parent) { }
}

export default DragRender;
