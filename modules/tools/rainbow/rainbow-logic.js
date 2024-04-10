
class RainbowLogic {
  constructor(entity) {
    this._entity = entity;

    this.board.emitter.on('onBrush', this.changeColor.bind(this));
    this.board.emitter.on('onFill', this.changeColor.bind(this));
  }

  get board() { return this._entity.board; }
  get colorTool() { return this._entity.colorTool; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }

  enable() { this._entity.enable(); }
  disable() { this._entity.disable(); }
  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  reset() { this._entity.onReset(); }

  changeColor() {
    if (!this.isEnabled) return;

    this._entity.onChangeColor();
  }
}

export default RainbowLogic;
