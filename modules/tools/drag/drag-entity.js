
import Emitter from '../../../libraries/emitter.js';

class DragEntity {
  constructor(camera) {
    this.camera = camera;
    this.enabled = false;
    this.emitter = new Emitter();
  }

  enable() {
    this.enabled = true;
    this.camera.setMoveable(true);
    this.emitter.fire('enable');
  }
  disable() {
    this.enabled = false;
    this.camera.setMoveable(false);
    this.emitter.fire('disable');
  }
}

export default DragEntity;
