
import Emitter from '../../../libraries/emitter.js';

class ThumbEntity {
  constructor(board) {
    this.board = board;
    this.position = { x: 0, y: 0 };
    this.enabled = false;
    this.showed = false;
    this.emitter = new Emitter();
  }

  get size() { return this.board.grid.cellSize; }
  get scale() { return this.board.scale; }

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

  show() {
    this.showed = true;
    this.emitter.fire('show');
  }
  hide() {
    this.showed = false;
    this.emitter.fire('hide');
  }
}

export default ThumbEntity;
