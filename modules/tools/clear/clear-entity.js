import Emitter from '../../../libraries/emitter.js';

class ClearEntity {
  constructor(board) {
    this.board = board;
    this.emitter = new Emitter();
  }

  onClear() {
    this.board.clear();

    this.emitter.fire('onClear');
  }
}

export default ClearEntity;
