import debounce from '../../../libraries/debounce.js';
import { rgbToHex } from '../../libraries/helpers.js';

class BoardRender {
  constructor(entity, options) {
    this._entity = entity;
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();

    this.update = this.update.bind(this);
    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);

    this.emitter.on('onSetGrid', () => this.updateDebounce());
    this.emitter.on('onSetCells', this.#updateCells.bind(this));
    this.emitter.on('onClear', this.#updateCells.bind(this));
    this.emitter.on('onErase', this.#updateCells.bind(this));
    this.emitter.on('onBrush', this.#updateCells.bind(this));
    this.emitter.on('onFill', this.#updateCells.bind(this));
    this.emitter.on('onMove', this.update);
  }

  get emitter() { return this._entity.emitter; }
  get target() { return this.elements.get('board'); }
  get scale() {
    const board = this.elements.get('board');

    if (!board) return;

    const rect = board.getBoundingClientRect();
    const size = this._entity.size;

    return {
      x: rect.width / size.width,
      y: rect.height / size.height,
    };
  }

  handleMouseLeave(event) { this.emitter.fire('handleMouseLeave', event); }
  handleMouseEnter(event) { this.emitter.fire('handleMouseEnter', event); }
  handleMouseDown(event) { this.emitter.fire('handleMouseDown', event); }
  handleMouseUp(event) { this.emitter.fire('handleMouseUp', event); }
  handleMouseMove(event) { this.emitter.fire('handleMouseMove', event); }

  #updateCells() {
    const cellContainer = this.elements.get('cellContainer');

    const { cellSize } = this._entity.grid;
    const cells = this._entity.cells;
    cellContainer.innerHTML = '';

    cells.forEach(({ position, color }) => {
      const cell = document.createElement('div');
      cell.classList.add('board__cell');

      const pos = this._entity.calculateCellToPosition(this._entity.calculatePositionToCell(position));

      cell.style.backgroundColor = rgbToHex(color, color.a);
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.left = `${pos.x}px`;
      cell.style.top = `${pos.y}px`;

      cellContainer.append(cell);
    });
  }

  update() {
    const board = this.elements.get('board');

    if (!board || !this._entity) return null;

    const { width, height } = this._entity.size;
    const { x, y } = this._entity.position;

    if (board.classList.length > 0) board.className = '';
    board.classList.add('board', ...this.options.cls);

    board.style.width = `${width}px`;
    board.style.height = `${height}px`;

    board.style.top = `${y}px`;
    board.style.left = `${x}px`;

    this.#updateCells();
  }

  destroy() {
    const board = this.elements.get('board');

    if (board) board.remove();

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);

    this.elements.clear();
  }

  render(parent) {
    if (!parent && !this._entity) return null;

    let board = this.elements.get('board');

    if (!board) {
      board = document.createElement('div');
      this.elements.set('board', board);

      const cellContainer = document.createElement('div');
      cellContainer.classList.add('board__cell-container');
      this.elements.set('cellContainer', cellContainer);

      board.append(cellContainer);

      board.addEventListener('mouseleave', this.handleMouseLeave);
      board.addEventListener('mouseenter', this.handleMouseEnter);
      board.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    this.update();

    this.parent = parent;
    this.parent.append(board);
  }
}

export default BoardRender;
