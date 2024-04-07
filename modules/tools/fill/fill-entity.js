
import Emitter from '../../../libraries/emitter.js';

class FillEntity {
  constructor(board, toolColor) {
    this.board = board;
    this.toolColor = toolColor;
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

    this.board.fill(position, this.toolColor.color);
    this.emitter.fire('onBrush', position, this.toolColor.color);
  }
}

export default FillEntity;
