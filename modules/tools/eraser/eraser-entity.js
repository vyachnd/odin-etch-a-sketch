
import Emitter from '../../../libraries/emitter.js';

class EraserEntity {
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

  onErase(position) {
    if (!this.enabled) return;

    this.board.erase(position);
    this.emitter.fire('onErase', position);
  }
}

export default EraserEntity;
