

class ColorLogic {
  constructor(entity) {
    this._entity = entity;
  }

  get emitter() { return this._entity.emitter; }
  get color() { return this._entity.color; }

  setColor(rgba) { this._entity.setColor(rgba); }

  change(color) { this._entity.onChange(color); }
}

export default ColorLogic;
