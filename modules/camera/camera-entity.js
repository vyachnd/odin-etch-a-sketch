import Emitter from '../../libraries/emitter.js';

class CameraEntity {
  constructor() {
    this.attachment = null;
    this.position = { x: 0, y: 0 };
    this.zoom = {
      current: 1,
      max: 4,
      min: 0.2,
      step: 0.1,
    };
    this.emitter = new Emitter();
  }

  move(position) {
    this.position = Object.assign(this.position, position);
    this.emitter.fire('move', this.position);
  }

  attach(attachment) {
    this.attachment = attachment;
    this.emitter.fire('attach', this.attachment);
  }
}

export default CameraEntity;
