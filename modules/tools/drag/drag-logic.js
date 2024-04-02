
import Emitter from '../../../libraries/emitter.js';

class DragLogic {
  constructor(entity, render) {
    this.entity = entity;
    this.render = render;
    this.emitter = new Emitter();
  }
}

export default DragLogic;
