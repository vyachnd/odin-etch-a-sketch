
import Emitter from '../../../libraries/emitter.js';

class BrushEntity {
  constructor(board) {
    this.board = board;
    this.color = { r: 0, g: 0, b: 0, a: 1 };
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
  toggle() {
    this.enabled = !this.enabled;
    this.emitter.fire('toggle', this.enabled);
  }

  onBrush(position, event) {
    if (!this.enabled) return;

    this.board.brush(position, this.color);
    this.emitter.fire('onBrush', position, this.color, event);
  }
}

export default BrushEntity;
