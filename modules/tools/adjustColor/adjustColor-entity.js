
import Emitter from '../../../libraries/emitter.js';
import { adjustColor, objectsEqual } from '../../../libraries/helpers.js';

class AdjustColorEntity {
  constructor(board) {
    this.board = board;
    this.factor = 0;
    this.prevCell = null;
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

  setFactor(factor) { this.factor = factor; }

  onAdjustColor(position) {
    if (!this.enabled) return;

    const cell = this.board.getCell(position);

    if (!cell) return;

    const color = adjustColor(cell.color, this.factor);

    if (objectsEqual(cell.color, color)) return;

    this.board.brush(cell.position, color);
    this.emitter.fire('onAdjustColor', cell);

    this.prevCell = this.board.posToCell(position);
  }
}

export default AdjustColorEntity;
