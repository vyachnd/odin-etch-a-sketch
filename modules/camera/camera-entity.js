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

  setZoom(value) {
    this.zoom.current = Math.max(this.zoom.min, Math.min(this.zoom.max, value));
    this.emitter.fire('zoom', this.zoom.current);
  }

  zoomIn() {
    this.zoom.current += this.zoom.step;
    if (this.zoom.current > this.zoom.max) this.zoom.current = this.zoom.max;
    this.emitter.fire('zoomIn', this.zoom.current);
  }

  zoomOut() {
    this.zoom.current -= this.zoom.step;
    if (this.zoom.current < this.zoom.min) this.zoom.current = this.zoom.min;
    this.emitter.fire('zoomOut', this.zoom.current);
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
