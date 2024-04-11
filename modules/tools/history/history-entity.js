
import Emitter from '../../../libraries/emitter.js';
import { deepCopyMap, minmax } from '../../../libraries/helpers.js';

class HistoryEntity {
  constructor(board) {
    this.board = board;
    this.history = [];
    this.index = 0;
    this.emitter = new Emitter();
  }

  #setHistoryToBoard(index) {
    const historyCells = this.history[index - 1];

    if (historyCells) {
      this.board.setCells(deepCopyMap(historyCells));
    } else {
      this.board.setCells(new Map());
    };
  }

  undo() {
    this.index = minmax(this.index - 1, 0, this.history.length);

    this.#setHistoryToBoard(this.index);

    this.emitter.fire('undo', { index: this.index, history: this.history.slice(0, this.index + 1) });
  }

  redo() {
    this.index = minmax(this.index + 1, 0, this.history.length);

    this.#setHistoryToBoard(this.index);

    this.emitter.fire('redo', { index: this.index, history: this.history.slice(0, this.index + 1) });
  }

  onChange() {
    if (this.index !== this.history.length) {
      this.history = this.history.slice(0, this.index);
    }
    this.history.push(this.board.cells);

    this.index = this.history.length;

    this.emitter.fire('onChange', { index: this.index, history: this.history });
  }
}

export default HistoryEntity;
