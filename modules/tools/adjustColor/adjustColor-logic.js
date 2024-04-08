import { objectsEqual } from '../../../libraries/helpers.js';

class AdjustColorLogic {
  constructor(entity) {
    this._entity = entity;

    this.board.emitter.on('onMouseLeave', () => this._entity.prevCell = null);
    this.board.emitter.on('onMouseDown', this.handleMouseDown.bind(this));
    this.board.emitter.on('onMouseMove', this.handleMouseMove.bind(this));
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get isEnabled() { return this._entity.enabled; }

  enable() { this._entity.enable(); }
  disable() { this._entity.disable(); }
  toggle() { this._entity.toggle(); }

  setFactor(factor) { this._entity.setFactor(factor); }

  handleMouseDown(data) {
    if (!this.isEnabled) return;
    if (data.button !== 0) return;

    this._entity.onAdjustColor(data.position);
  }
  handleMouseMove(data) {
    if (!this.isEnabled) return;
    if (!data.down) return;
    if (data.button !== 0) return;

    if (objectsEqual(this._entity.prevCell, data.cell)) return;

    this._entity.onAdjustColor(data.position);
  }
}

export default AdjustColorLogic;
