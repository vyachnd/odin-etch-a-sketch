
import Emitter from '../../../libraries/emitter.js';

class GridEntity {
  constructor(board) {
    this.board = board;
    this.position = { x: 0, y: 0 };
    this.emitter = new Emitter();
  }

  move(position) {
    this.position = Object.assign(this.position, position);
    this.emitter.fire('move', this.position);
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
}

export default GridEntity;