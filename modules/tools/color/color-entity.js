
import Emitter from '../../../libraries/emitter.js';

class ColorEntity {
  constructor() {
    this.color = { r: 56, g: 189, b: 248, a: 1 };
    this.emitter = new Emitter();
  }

  onChange(color) {
    this.color = color;
    this.emitter.fire('onChange', color);
  }
}

export default ColorEntity;
