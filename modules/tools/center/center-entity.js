
import Emitter from '../../../libraries/emitter.js';
import { distance } from '../../../libraries/helpers.js';

class CenterEntity {
  constructor(camera, board) {
    this.camera = camera;
    this.board = board;
    this.emitter = new Emitter();
  }

  onCenter() {
    const size = this.board.size;

    this.board.move({
      x: -size.width / 2,
      y: -size.height / 2,
    });

    this.camera.setPosition(this.camera.center);

    this.emitter.fire('onCenter');
  }

  onMove(position) { this.emitter.fire('onMove', distance(this.camera.center, position)); }
}

export default CenterEntity;
