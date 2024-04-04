
import Emitter from '../../../libraries/emitter.js';

class DragEntity {
  constructor(camera) {
    this.camera = camera;
    this.position = { x: 0, y: 0 };
    this.enabled = false;
    this.emitter = new Emitter();
  }

  enable() {
    this.enabled = true;
    this.emitter.fire('enable');
  }
  disable() {
    this.enabled = false;
    this.emitter.fire('disable');
  }
  toggle() {
    this.enabled = !this.enabled;
    this.emitter.fire('toggle', this.enabled);
  }
}

export default DragEntity;
