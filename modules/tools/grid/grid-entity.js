
import Emitter from '../../../libraries/emitter.js';

class GridEntity {
  constructor(board) {
    this.board = board;
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
}

export default GridEntity;
