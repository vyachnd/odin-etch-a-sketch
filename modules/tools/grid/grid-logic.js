

class GridLogic {
  constructor(entity, render) {
    this._entity = entity;
    this._render = render;
  }

  get board() { return this._entity.board; }
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

  destroy() { this._render.destroy(); }
  render(parent) { this._render.render(parent); }
}

export default GridLogic;
