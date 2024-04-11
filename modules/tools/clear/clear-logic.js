class ClearLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  clear() { this._entity.onClear(); }
}

export default ClearLogic;
