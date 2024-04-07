

class ThumbLogic {
  constructor(entity, render) {
    this._entity = entity;
    this._render = render;

    this.board.emitter.on('onMouseLeave', this.handleMouseLeave.bind(this));
    this.board.emitter.on('onMouseEnter', this.handleMouseEnter.bind(this));
    this.board.emitter.on('onMouseMove', this.handleMouseMove.bind(this));
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }
  get isShowed() { return this._entity.showed; }

  enable() { this._entity.enable(); }
  disable() { this._entity.disable(); }
  toggle() { this._entity.toggle(); }

  hide() { this._entity.hide(); }
  show() { this._entity.show(); }

  destroy() { this._render.destroy(); }
  render(parent) { this._render.render(parent); }

  handleMouseLeave() { if (this.isEnabled) this.hide(); }
  handleMouseEnter() { if (this.isEnabled) this.show(); }
  handleMouseMove(data) {
    if (!this.isEnabled) return;
    if (this.board.isOut(data.position)) return;

    if (!this.isShowed) this.show();

    this._entity.move(data.cellPos);
  }
}

export default ThumbLogic;
