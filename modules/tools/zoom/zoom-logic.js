class ZoomLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get camera() { return this._entity.camera; }
  get emitter() { return this._entity.emitter; }
}

export default ZoomLogic;
