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

  isWithinBoard(pixel) {
    const withinX = pixel.x >= 0 && pixel.x < this.grid.rows;
    const withinY = pixel.y >= 0 && pixel.y < this.grid.cols;

    return withinX && withinY;
  }

  positionToPixel(position) {
    const pixel = {
      x: Math.floor(position.x / this.pixelSize),
      y: Math.floor(position.y / this.pixelSize),
    };

    return pixel;
  }

  pixelToPosition(pixel) {
    const position = {
      x: pixel.x * this.pixelSize,
      y: pixel.y * this.pixelSize,
    };

    return position;
  }
}

export default BoardEntity;
