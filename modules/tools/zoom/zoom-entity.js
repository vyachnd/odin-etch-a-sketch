
import Emitter from '../../../libraries/emitter.js';

class ZoomEntity {
  constructor(camera) {
    this.camera = camera;
    this.emitter = new Emitter();
  }
}

export default ZoomEntity;
