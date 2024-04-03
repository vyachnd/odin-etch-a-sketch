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
    this.render.emitter.on('handleMouseLeave', this.handleMouseLeave.bind(this));
    this.render.emitter.on('handleMouseEnter', this.handleMouseEnter.bind(this));
  }

  calculateOffset(clientX, clientY) {
    const rect = this.render.target.getBoundingClientRect();
    const scale = this.render.scale;

    return {
      x: Math.floor((clientX - rect.left) / scale.x),
      y: Math.floor((clientY - rect.top) / scale.y),
    };
  }

  calculatePixel(clientX, clientY) {
    const offset = this.calculateOffset(clientX, clientY);
    const pixel = this.entity.positionToPixel(offset);

    return pixel;
  }

  handleMouseDown(event) {
    if (event.target !== this.render.target) return;

    const offset = this.calculateOffset(event.clientX, event.clientY);
    const pixel = this.entity.positionToPixel(offset);

    if (!this.entity.isWithinBoard(pixel)) return;

    this.mouse = {
      ...this.mouse,
      down: true,
      offset: offset,
    };

    this.emitter.fire('handleMouseDown', event, { pixel, mouse: this.mouse });
  }

  handleMouseUp(event) {
    const pixel = this.calculatePixel(event.clientX, event.clientY);

    this.mouse = {
      ...this.mouse,
      down: false,
      offset: { x: 0, y: 0 }
    };

    this.emitter.fire('handleMouseUp', event, { pixel, mouse: this.mouse });
  }

  handleMouseMove(event) {
    const pixel = this.calculatePixel(event.clientX, event.clientY);

    if (!this.entity.isWithinBoard(pixel)) return;

    this.emitter.fire('handleMouseMove', event, { pixel, mouse: this.mouse });
  }

  handleMouseLeave(event) {
    const pixel = this.calculatePixel(event.clientX, event.clientY);

    this.emitter.fire('handleMouseLeave', event, { pixel, mouse: this.mouse });
  }

  handleMouseEnter(event) {
    const pixel = this.calculatePixel(event.clientX, event.clientY);

    this.emitter.fire('handleMouseEnter', event, { pixel, mouse: this.mouse });
  }
}

export default BoardLogic;
