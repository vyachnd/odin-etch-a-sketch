import Emitter from '../../libraries/emitter.js';

class BoardLogic {
  constructor(entity, render) {
    this.entity = entity;
    this.render = render;
    this.emitter = new Emitter();

    this.mouse = {
      offset: { x: 0, y: 0 },
      down: false,
    };

    this.render.emitter.on('handleMouseDown', this.handleMouseDown.bind(this));
    this.render.emitter.on('handleMouseUp', this.handleMouseUp.bind(this));
    this.render.emitter.on('handleMouseMove', this.handleMouseMove.bind(this));
  }

  calculateOffset(clientX, clientY) {
    const rect = this.render.target.getBoundingClientRect();
    const scale = this.render.scale;
    return {
      x: Math.floor((clientX - rect.left) / scale.x),
      y: Math.floor((clientY - rect.top) / scale.y),
    };
  }

  handleMouseDown(event) {
    const offset = this.calculateOffset(event.clientX, event.clientY);
    const pixel = this.entity.positionToPixel(offset);

    if (event.target !== this.render.target) return;

    this.mouse = {
      ...this.mouse,
      down: true,
      offset,
    };

    this.emitter.fire('handleMouseDown', event, { pixel, mouse: this.mouse });
  }

  handleMouseUp(event) {
    const offset = this.calculateOffset(event.clientX, event.clientY);
    const pixel = this.entity.positionToPixel(offset);

    this.mouse = {
      ...this.mouse,
      down: false,
      offset: { x: 0, y: 0 }
    };

    this.emitter.fire('handleMouseUp', event, { pixel, mouse: this.mouse });
  }

  handleMouseMove(event) {
    const offset = this.calculateOffset(event.clientX, event.clientY);
    const pixel = this.entity.positionToPixel(offset);

    this.emitter.fire('handleMouseMove', event, { pixel, mouse: this.mouse });
  }
}

export default BoardLogic;
