import Emitter from '../../libraries/emitter.js';
import { objectsEqual } from '../../libraries/helpers.js';

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
    const isOut = this.isOut(mouse.position || this.mouse.position);

    this.mouse = { ...this.mouse, ...mouse, isOut };

    this.mouse.cell = this.calculatePositionToCell(this.mouse.position);
    this.mouse.cellPos = this.calculateCellToPosition(this.mouse.cell);
  }

  #cellKeyFormat(cell) { return `${cell.x}-${cell.y}`; }

  #createCell(position, color) {
    if (this.isOut(position)) return;

    const cell = this.calculatePositionToCell(position);
    const cellKey = this.#cellKeyFormat(cell);

    if (this.cells.has(cellKey)) return;

    this.cells.set(cellKey, { position, color });
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

  isOut(position) {
    if (position.x < 0 || position.y < 0) return true;
    if (position.x >= this.size.width || position.y >= this.size.height) return true;

    return false;
  }

  getCell(position) {
    if (this.isOut(position)) return null;

    const cellKey = this.#cellKeyFormat(this.calculatePositionToCell(position));
    const targetCell = this.cells.get(cellKey);

    if (!targetCell) return;

    return targetCell;
  }

  getCellNeighbors(cellPos) {
    const neighbors = [
      { x: cellPos.x, y: cellPos.y - 1 },
      { x: cellPos.x + 1, y: cellPos.y },
      { x: cellPos.x, y: cellPos.y + 1 },
      { x: cellPos.x - 1, y: cellPos.y },
    ];

    return neighbors.filter((neighbor) => !this.isOut(this.calculateCellToPosition(neighbor)));
  }

  getCellsFrom(cellPos) {
    const targetCellKey = this.#cellKeyFormat(cellPos);
    const targetCell = this.cells.get(targetCellKey);
    const findedCells = new Map();

    findedCells.set(targetCellKey, cellPos);

    const tempFinded = [findedCells.get(targetCellKey)];

    while (tempFinded.length > 0) {
      const tempCell = tempFinded.shift();
      const tempNeighbors = this.getCellNeighbors(tempCell);

      for (const tempNeighbor of tempNeighbors) {
        const tempNeighborKey = this.#cellKeyFormat(tempNeighbor);
        const tempNeighborCell = this.cells.get(tempNeighborKey);

        if (this.isOut(this.calculateCellToPosition(tempNeighbor))) continue;
        if (findedCells.has(tempNeighborKey)) continue;

        if (
          (!targetCell && !tempNeighborCell)
          || ((targetCell && tempNeighborCell) && objectsEqual(targetCell.color, tempNeighborCell.color))
        ) {
          tempFinded.push(tempNeighbor);
          findedCells.set(tempNeighborKey, tempNeighbor);
        }
      }
    }

    return findedCells;
  }

  onClear() {
    this.cells.clear();
    this.emitter.fire('onClear');
  }

  onErase(position) {
    if (this.isOut(position)) return;

    const cellKey = this.#cellKeyFormat(this.calculatePositionToCell(position));
    const targetCell = this.cells.get(cellKey);

    if (!targetCell) return;

    this.cells.delete(cellKey);

    this.emitter.fire('onErase', position);
  }

  onBrush(position, color) {
    if (this.isOut(position)) return;

    const targetCell = this.cells.get(this.#cellKeyFormat(this.calculatePositionToCell(position)));

    if (targetCell) {
      targetCell.color = color;
    } else {
      this.#createCell(position, color);
    }

    this.emitter.fire('onBrush', { position, color });
  }

  onFill(position, color) {
    if (this.isOut(position)) return;

    const cells = this.getCellsFrom(this.calculatePositionToCell(position));
    cells.forEach((cell) => {
      const targetCell = this.cells.get(this.#cellKeyFormat(cell));

      if (targetCell) {
        targetCell.color = color;
      } else {
        this.#createCell(this.calculateCellToPosition(cell), color);
      }
    });

    this.emitter.fire('onFill', cells, position, color);
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
