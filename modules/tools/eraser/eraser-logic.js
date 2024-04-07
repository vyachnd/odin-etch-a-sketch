class EraserLogic {
  constructor(entity) {
    this._entity = entity;

    this.board.emitter.on('onMouseDown', this.handleMouseDown.bind(this));
    this.board.emitter.on('onMouseMove', this.handleMouseMove.bind(this));
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }

  enable() { this._entity.enable(); }
  disable() { this._entity.disable(); }
  toggle() { this._entity.toggle(); }

  handleMouseDown(data) {
    if (!this.isEnabled) return;
    if (data.button !== 0) return;

    this._entity.onErase(data.position);
  }
  handleMouseMove(data) {
    if (!this.isEnabled) return;
    if (!data.down) return;
    if (data.button !== 0) return;

    this._entity.onErase(data.position);
  }
}

export default EraserLogic;
