
import Emitter from '../../../libraries/emitter.js';

class ZoomEntity {
  constructor(camera) {
    this.camera = camera;
    this.emitter = new Emitter();
  }

  onZoomOut() {
    this.camera.zoomOut();
    this.emitter.fire('onZoomOut');
  }
  onZoomReset() {
    this.camera.zoomReset();
    this.emitter.fire('onZoomReset');
  }
  onZoomIn() {
    this.camera.zoomIn();
    this.emitter.fire('onZoomIn');
  }
}

export default ZoomEntity;
