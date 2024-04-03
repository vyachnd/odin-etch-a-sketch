import debounce from '../../../libraries/debounce.js';
import Emitter from '../../../libraries/emitter.js';

class BoardRender {
  constructor(entity, options) {
    this.entity = entity;
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  get target() { return this.elements.get('board'); }

  get scale() {
    const board = this.elements.get('board');

    if (!board) return;

    const rect = board.getBoundingClientRect();
    const size = this.entity.size;

    return {
      x: rect.width / size.width,
      y: rect.height / size.height,
    };
  }

  handleMouseDown(event) { this.emitter.fire('handleMouseDown', event); }
  handleMouseUp(event) { this.emitter.fire('handleMouseUp', event); }
  handleMouseMove(event) { this.emitter.fire('handleMouseMove', event); }
  handleMouseLeave(event) { this.emitter.fire('handleMouseLeave', event); }
  handleMouseEnter(event) { this.emitter.fire('handleMouseEnter', event); }

  update() {
    const board = this.elements.get('board');

    if (!board && !this.entity) return null;

    const { width, height } = this.entity.size;
    const { x, y } = this.entity.position;

    if (board.classList.length > 0) board.className = '';
    board.classList.add('board', ...this.options.cls);

    board.style.width = `${width}px`;
    board.style.height = `${height}px`;

    board.style.top = `${y}px`;
    board.style.left = `${x}px`;
  }

  destroy() {
    const board = this.elements.get('board');

    if (board) board.remove();

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);

    this.elements.clear();
  }

  render(parent) {
    if (!parent && !this.entity) return null;

    let board = this.elements.get('board');

    if (!board) {
      board = document.createElement('div');
      this.elements.set('board', board);

      board.addEventListener('mousedown', this.handleMouseDown);
      board.addEventListener('mouseleave', this.handleMouseLeave);
      board.addEventListener('mouseenter', this.handleMouseEnter);
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    this.update();

    this.parent = parent;
    this.parent.append(board);
  }
}

export default BoardRender;
