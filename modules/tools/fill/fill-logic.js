

class FillLogic {
  constructor(entity) {
    this._entity = entity;

    this.board.emitter.on('onMouseDown', this.handleMouseDown.bind(this));
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }

  enable() { this._entity.enable(); }
  disable() { this._entity.disable(); }
  toggle() { this._entity.toggle(); }

  setColor(rgba) { this._entity.setColor(rgba); }

  handleMouseDown(data, event) {
    if (!this.isEnabled) return;
    if (data.button !== 0) return;

    this._entity.onFill(data.position);
  }
}

export default FillLogic;
