import Emitter from '../../../libraries/emitter.js';

class SizeEntity {
  constructor(board) {
    this.board = board;
    this.size = {
      current: board.grid.rows,
      min: 4,
      max: 256,
    };
    this.emitter = new Emitter();
  }

  setSize(value) {
    let newValue = value;

    if (isNaN(newValue) || !isFinite(newValue)) return;
    if (value < this.size.min) newValue = this.size.min;
    if (value > this.size.max) newValue = this.size.max;

    this.size.current = newValue;
    this.board.setGrid({ rows: newValue, cols: newValue});

    this.emitter.fire('setSize', value);
  }
}

export default SizeEntity;
