import Emitter from '../../libraries/emitter.js';

class BoardEntity {
  constructor(options) {
    this.grid = {
      rows: options?.grid?.rows || 8,
      cols: options?.grid?.cols || 8,
      cellSize: 40,
    };
    this.position = { x: 0, y: 0 };
    this.mouse = {
      position: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      button: null,
      down: false,
      isOut: false,
    };
    this.cells = new Map();
    this.emitter = new Emitter();
  }

  get size() {
    return {
      width: this.grid.cols * this.grid.cellSize,
      height: this.grid.rows * this.grid.cellSize,
    };
  }

  #setMouse(mouse) {
    const isOut = this.isMouseOut(mouse.position || this.mouse.position);

    this.mouse = { ...this.mouse, ...mouse, isOut };

    this.mouse.cell = this.calculatePositionToCell(this.mouse.position);
    this.mouse.cellPos = this.calculateCellToPosition(this.mouse.cell);
  }

  calculatePositionToCell(position) {
    return {
      x: Math.floor(position.x / this.grid.cellSize),
      y: Math.floor(position.y / this.grid.cellSize),
    };
  }
  calculateCellToPosition(cell) {
    return {
      x: Math.floor(cell.x * this.grid.cellSize),
      y: Math.floor(cell.y * this.grid.cellSize),
    };
  }

  addCell(position, color) {
    if (this.isMouseOut(position)) return;

    const cell = this.calculatePositionToCell(position);

    if (this.cells.has(`${cell.x}-${cell.y}`)) return;

    this.cells.set(`${cell.x}-${cell.y}`, { position, color });

    this.emitter.fire('addCell', { position, color });
  }

  isMouseOut(position) {
    if (position.x < 0 || position.y < 0) return true;
    if (position.x >= this.size.width || position.y >= this.size.height) return true;

    return false;
  }

  onMove(position) {
    this.position = Object.assign(this.position, position);
    this.emitter.fire('onMove', position);
  }

  onMouseEnter(position, event) {
    this.#setMouse({ position });
    this.emitter.fire('onMouseEnter', this.mouse, event);
  }
  onMouseLeave(position, event) {
    this.#setMouse({ position });
    this.emitter.fire('onMouseLeave', this.mouse, event);
  }
  onMouseDown(position, event) {
    this.#setMouse({ position, offset: position, button: event.button, down: true });
    this.emitter.fire('onMouseDown', this.mouse, event);
  }
  onMouseUp(position, event) {
    this.#setMouse({ position, offset: position, button: null, down: false });
    this.emitter.fire('onMouseUp', this.mouse, event);
  }
  onMouseMove(position, event) {
    this.#setMouse({ position });
    this.emitter.fire('onMouseMove', this.mouse, event);
  }
}

export default BoardEntity;
