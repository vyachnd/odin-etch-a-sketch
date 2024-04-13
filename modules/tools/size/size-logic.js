class SizeLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get size() { return this._entity.size; }

  setSize(value) { this._entity.setSize(value); }
}

export default SizeLogic;
