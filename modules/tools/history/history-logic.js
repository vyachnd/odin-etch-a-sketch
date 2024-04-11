
class HistoryLogic {
  constructor(entity) {
    this._entity = entity;

    this.board.emitter.on('onClear', this.onChange.bind(this));
    this.board.emitter.on('onErase', this.onChange.bind(this));
    this.board.emitter.on('onFill', this.onChange.bind(this));
    this.board.emitter.on('onBrush', this.onChange.bind(this));
  }

  get board() { return this._entity.board; }
  get emitter() { return this._entity.emitter; }

  get index() { return this._entity.index; }
  get history() { return this._entity.history; }

  undo() { return this._entity.undo(); }
  redo() { return this._entity.redo(); }

  onChange() { this._entity.onChange(); }
}

export default HistoryLogic;
