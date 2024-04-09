
import Emitter from '../../../libraries/emitter.js';

class FillEntity {
  constructor(board) {
    this.board = board;
    this.color = { r: 255, g: 255, b: 255, a: 1 };
    this.enabled = false;
    this.emitter = new Emitter();
  }

  enable() {
    this.enabled = true;
    this.emitter.fire('enable');
  }
  disable() {
    this.enabled = false;
    this.emitter.fire('disable');
  }

  getColor() { return Object.assign({}, this.color); }

  setColor(rgba) {
    this.color = Object.assign(this.color, rgba);
    this.emitter.fire('setColor', this.getColor());
  }

  onFill(position) {
    if (!this.enabled) return;

    this.board.fill(position, this.getColor());
    this.emitter.fire('onBrush', position, this.getColor());
  }
}

export default FillEntity;
