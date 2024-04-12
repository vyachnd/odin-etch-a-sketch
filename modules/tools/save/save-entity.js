import Emitter from '../../../libraries/emitter.js';

class SaveEntity {
  constructor(board) {
    this.board = board;
    this.emitter = new Emitter();
  }

  #getMatrix() {
    const { grid, size } = this.board;
    const matrix = [];

    for (let y = 0; y < grid.cols; y += 1) {
      for (let x = 0; x < grid.rows; x += 1) {
        const cell = this.board.getCell({ x: x * grid.cellSize, y: y * grid.cellSize });
        const color = cell?.color ? [cell.color.r, cell.color.g, cell.color.b, cell.color.a * 255] : [0, 0, 0, 0];

        for (let dy = 0; dy < grid.cellSize; dy += 1) {
          for (let dx = 0; dx < grid.cellSize; dx += 1) {
            const index = ((y * grid.cellSize + dy) * size.width + (x * grid.cellSize + dx)) * 4;

            matrix[index] = color[0];
            matrix[index + 1] = color[1];
            matrix[index + 2] = color[2];
            matrix[index + 3] = color[3];
          }
        }
      }
    }

    return matrix;
  }

  #download() {
    const { size } = this.board;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size.width, size.height);

    canvas.width = size.width;
    canvas.height = size.height;

    imgData.data.set(this.#getMatrix());
    ctx.putImageData(imgData, 0, 0);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'etch-a-sketch.png';
    link.click();
  }

  onSave() {
    this.#download();
    this.emitter.fire('onSave');
  }
}

export default SaveEntity;
