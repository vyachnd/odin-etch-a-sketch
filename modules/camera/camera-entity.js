import Emitter from '../../libraries/emitter.js';
import { getUniqueId } from '../../libraries/helpers.js';

class CameraEntity {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.zoom = {
      current: 1,
      max: 4,
      min: 0.2,
      step: 0.1,
    };
    this.mouse = {
      position: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      button: null,
      down: false,
      isOut: false,
    };
    this.moveable = true;
    this.zoomable = true;
    this.entities = new Map();
    this.emitter = new Emitter();
  }

  setMouse(mouse) { this.mouse = { ...this.mouse, ...mouse }; }

  setZoom(value) {
    if (!this.zoomable) return;

    this.zoom.current = Math.max(this.zoom.min, Math.min(this.zoom.max, value));
    this.emitter.fire('setZoom', this.zoom.current);
  }

  setMoveable(moveable) {
    this.moveable = moveable;
    this.emitter.fire('setMoveable', this.moveable);
  }

  setZoomable(zoomable) {
    this.zoomable = zoomable;
    this.emitter.fire('setZoomable', this.zoomable);
  }

  addEntity(entity) {
    const entityId = getUniqueId();

    this.entities.set(entityId, entity);
    this.emitter.fire('addEntity', entity);

    return entityId;
  }

  onMove(position) {
    if (!this.moveable) return;

    this.position = Object.assign(this.position, position);
    this.emitter.fire('onMove', position);
  }

  onZoomIn(event) {
    if (!this.zoomable) return;

    this.zoom.current = Math.min(this.zoom.max, this.zoom.current + this.zoom.step);
    this.emitter.fire('onZoomIn', this.zoom, event);
  }
  onZoomOut(event) {
    if (!this.zoomable) return;

    this.zoom.current = Math.max(this.zoom.min, this.zoom.current - this.zoom.step);
    this.emitter.fire('onZoomOut', this.zoom, event);
  }
  onZoomReset(event) {
    if (!this.zoomable) return;

    this.zoom.current = 1;
    this.emitter.fire('onZoomReset', this.zoom, event);
  }

  onMouseDown(position, event) {
    this.setMouse({ position, offset: position, button: event.button, down: true, event });
    this.emitter.fire('onMouseDown', this.mouse, event);
  }
  onMouseUp(position, event) {
    this.setMouse({ position, offset: position, button: null, down: false, event });
    this.emitter.fire('onMouseUp', this.mouse, event);
  }
  onMouseMove(position, event) {
    this.setMouse({ position, event });
    this.emitter.fire('onMouseMove', this.mouse, event);
  }
}

export default CameraEntity;
