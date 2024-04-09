
import debounce from '../../../libraries/debounce.js';

class GridRender {
  constructor(entity, options) {
    this._entity = entity;
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();

    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.update = this.update.bind(this);

    this.emitter.on('enable', () => this.updateDebounce());
    this.emitter.on('disable', () => this.updateDebounce());
  }

  #createGridLine(top, left, isVertical) {
    const gridLine = document.createElement('div');
    gridLine.classList.add('grid__line');

    gridLine.style.top = `${left}px`;
    gridLine.style.left = `${top}px`;

    if (isVertical) gridLine.dataset.ver = '';

    return gridLine;
  }

  get emitter() { return this._entity.emitter; }
  get target() { return this.elements.get('grid'); }

  update() {
    const grid = this.elements.get('grid');

    if (!this._entity.enabled) {
      this.destroy();
    } else {
      if (!grid) this.render(this.parent);
    }

    if (!grid || !this._entity) return null;

    if (grid.classList.length > 0) grid.className = '';
    grid.classList.add('grid', ...this.options.cls);
  }

  destroy() {
    const grid = this.elements.get('grid');

    if (grid) grid.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent && !this.grid) return null;

    let grid = this.elements.get('grid');

    if (!grid) {
      const boardGrid = this._entity.board.grid;

      grid = document.createElement('div');
      this.elements.set('grid', grid);

      this.elements.set('grid-lines', []);
      const gridLines = this.elements.get('grid-lines');

      for (let i = 0; i <= boardGrid.rows; i += 1) {
        const gridHorLine = this.#createGridLine(0, boardGrid.cellSize * i, false);
        grid.append(gridHorLine);
        gridLines.push(gridHorLine);
      }

      for (let i = 0; i <= boardGrid.cols; i += 1) {
        const gridVerLine = this.#createGridLine(boardGrid.cellSize * i, 0, true);
        grid.append(gridVerLine);
        gridLines.push(gridVerLine);
      }

    }

    this.update();

    this.parent = parent;
    this.parent.append(grid);
  }
}

export default GridRender;
