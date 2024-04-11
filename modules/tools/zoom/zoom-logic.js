class ZoomLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get camera() { return this._entity.camera; }
  get emitter() { return this._entity.emitter; }

  zoomOut() { this._entity.onZoomOut() }
  zoomReset() { this._entity.onZoomReset() }
  zoomIn() { this._entity.onZoomIn() }
}

export default ZoomLogic;
