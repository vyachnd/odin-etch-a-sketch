class SaveLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  save() { this._entity.onSave(); }
}

export default SaveLogic;
