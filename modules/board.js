import Emitter from '../libraries/emitter.js';

const PIXEL_SIZE = 40;
const ZOOM_STEP = 0.1;

class Board {
  constructor(rows, cols) {
    this.rows = rows || 16;
    this.cols = cols || 16;
    this.position = { x: 0, y: 0 };
    this.zoom = 1;
    this.pixels = new Map();
    this.emitter = new Emitter();
  }

  get size() {
    return {
      width: this.rows * PIXEL_SIZE,
      height: this.cols * PIXEL_SIZE,
    };
  }

  zoomIn() {
    this.zoom = Math.min(this.zoom + ZOOM_STEP, 3);
    this.emitter.fire('zoomIn', this.zoom);
  }

  zoomOut() {
    this.zoom = Math.max(0.2, this.zoom - ZOOM_STEP);
    this.emitter.fire('zoomOut', this.zoom);
  }

  zoomReset() {
    this.zoom = 1;
    this.emitter.fire('zoomReset', this.zoom);
  }

  moveTo(x, y) {
    this.position = Object.assign(this.position, { x, y });
    this.emitter.fire('moveTo', this.position);
  }

  moveOn(x, y) {
    this.position = Object.assign(this.position, {
      x: this.position.x + x,
      y: this.position.y + y,
    });
    this.emitter.fire('moveOn', this.position);
  }

  moveToCenter() { this.emitter.fire('moveToCenter'); }
}

export default Board;
