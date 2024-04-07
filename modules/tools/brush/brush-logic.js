

class BrushLogic {
  constructor(entity, render) {
    this._entity = entity;
    this._render = render;

    this.board.emitter.on('onMouseDown', this.handleMouseDown.bind(this));
    this.board.emitter.on('onMouseMove', this.handleMouseMove.bind(this));
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }

  enable() { this._entity.enable(); }
  disable() { this._entity.disable(); }
  toggle() { this._entity.toggle(); }

  destroy() { this._render.destroy(); }
  render(parent) { this._render.render(parent); }

  handleMouseDown(data, event) {
    if (!this.isEnabled) return;
    if (data.button !== 0) return;

    this._entity.onBrush(data.position, event);
  }
  handleMouseMove(data, event) {
    if (!this.isEnabled) return;
    if (!data.down) return;
    if (data.button !== 0) return;

    this._entity.onBrush(data.position, event);
  }
}

export default BrushLogic;
