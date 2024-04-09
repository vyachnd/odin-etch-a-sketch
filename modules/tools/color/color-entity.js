
import Emitter from '../../../libraries/emitter.js';

class ColorEntity {
  constructor(options) {
    this.color = options.color || { r: 255, g: 255, b: 255, a: 1 };
    this.emitter = new Emitter();
  }

  setColor(rgba) {
    this.color = Object.assign(this.color, rgba);
    this.emitter.fire('setColor', this.color);
  }

  onChange(rgba) {
    this.setColor(rgba);
    this.emitter.fire('onChange', this.color);
  }
}

export default ColorEntity;
