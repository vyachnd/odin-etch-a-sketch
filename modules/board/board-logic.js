class BoardLogic {
  constructor(entity, render) {
    this._entity = entity;
    this._render = render;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);

    this.emitter.on('handleMouseLeave', this.handleMouseLeave);
    this.emitter.on('handleMouseEnter', this.handleMouseEnter);
    this.emitter.on('handleMouseDown', this.handleMouseDown);
    this.emitter.on('handleMouseUp', this.handleMouseUp);
    this.emitter.on('handleMouseMove', this.handleMouseMove);
  }

  get cellSize() { return this._entity.grid.cellSize; }
  get emitter() { return this._entity.emitter; }
  get position() { return this._entity.position; }
  get grid() { return this._entity.grid; }
  get target() { return this._render.target; }
  get scale() { return this._render.scale; }

  calculatePosition(clientX, clientY) {
    const boardRect = this.target.getBoundingClientRect();
    const position = {
      x: Math.floor((clientX - boardRect.left) / this.scale.x),
      y: Math.floor((clientY - boardRect.top) / this.scale.y),
    };

    return position;
  }
  posToCell(position) { return this._entity.calculatePositionToCell(position); }
  cellToPos(cell) { return this._entity.calculateCellToPosition(cell); }

  isMouseOut(position) { return this._entity.isMouseOut(position); }

  destroy() { this._render.destroy(); }
  render(parent) { this._render.render(parent); }

  move(position) { this._entity.onMove(position); }

  handleMouseLeave(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseLeave(position, event);
  }
  handleMouseEnter(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseEnter(position, event);
  }
  handleMouseDown(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseDown(position, event);
  }
  handleMouseUp(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseUp(position, event);
  }
  handleMouseMove(event) {
    event.preventDefault();

    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseMove(position, event);
  }
}

export default BoardLogic;
