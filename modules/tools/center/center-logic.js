
class CenterLogic {
  constructor(entity) {
    this._entity = entity;

    this.camera.emitter.on('setPosition', this.onMove.bind(this));
    this.camera.emitter.on('onMove', this.onMove.bind(this));
  }

  get camera() { return this._entity.camera; }
  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  center() { this._entity.onCenter(); }

  onMove(position) { this._entity.onMove(position); }
}

export default CenterLogic;
