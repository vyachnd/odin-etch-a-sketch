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

  isMouseOut(position) {
    if (position.x < 0 || position.y < 0) return true;
    if (position.x >= this.size.width || position.y >= this.size.height) return true;

    return false;
  }

  setMouse(mouse) {
    const isOut = this.isMouseOut(mouse.position || this.mouse.position);

    this.mouse = { ...this.mouse, ...mouse, isOut };

    this.mouse.cell = this.calculatePositionToCell(this.mouse.position);
    this.mouse.cellPos = this.calculateCellToPosition(this.mouse.cell);
  }

  onMouseEnter(position, event) {
    this.setMouse({ position });
    this.emitter.fire('onMouseEnter', this.mouse, event);
  }
  onMouseLeave(position, event) {
    this.setMouse({ position });
    this.emitter.fire('onMouseLeave', this.mouse, event);
  }
  onMouseDown(position, event) {
    this.setMouse({ position, offset: position, down: true });
    this.emitter.fire('onMouseDown', this.mouse, event);
  }
  onMouseUp(position, event) {
    this.setMouse({ position, offset: position, down: false });
    this.emitter.fire('onMouseUp', this.mouse, event);
  }
  onMouseMove(position, event) {
    this.setMouse({ position });
    this.emitter.fire('onMouseMove', this.mouse, event);
  }
}

export default BoardEntity;
