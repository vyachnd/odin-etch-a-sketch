import Emitter from '../../libraries/emitter.js';

const PIXEL_SIZE = 40;

class BoardEntity {
  constructor(entity) {
    this.grid = {
      rows: entity?.grid?.rows || 8,
      cols: entity?.grid?.cols || 8
    };
    this.position = { x: 0, y: 0 };
    this.pixels = new Map();
    this.emitter = new Emitter();
  }

  get size() {
    return {
      width: this.grid.rows * PIXEL_SIZE,
      height: this.grid.cols * PIXEL_SIZE,
    };
  }

  get pixelSize() { return PIXEL_SIZE; }

  positionToPixel(position) {
    const pixel = {
      x: Math.floor(position.x / this.pixelSize),
      y: Math.floor(position.y / this.pixelSize),
    };

    pixel.x = Math.min(this.grid.rows - 1, Math.max(0, pixel.x));
    pixel.y = Math.min(this.grid.cols - 1, Math.max(0, pixel.y));

    return pixel;
  }
}

export default BoardEntity;
