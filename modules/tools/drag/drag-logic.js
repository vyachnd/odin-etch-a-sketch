

class DragLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get camera() { return this._entity.camera; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }

  enable() {
    this.camera.setMoveable(true);
    this._entity.enable();
  }
  disable() {
    this.camera.setMoveable(false);
    this._entity.disable();
  }
  toggle() {
    this.camera.setMoveable(!this.isEnabled);
    this._entity.toggle();
  }
}

export default DragLogic;
