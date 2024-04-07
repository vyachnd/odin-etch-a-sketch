
import Emitter from '../../../libraries/emitter.js';

class FillEntity {
  constructor(board) {
    this.board = board;
    this.color = { r: 255, g: 0, b: 0, a: 1 };
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

  onFill(position) {
    if (!this.enabled) return;

    this.board.fill(position, this.color);
    this.emitter.fire('onBrush', position, this.color, event);
  }
}

export default FillEntity;