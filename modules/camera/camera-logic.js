import Emitter from '../../libraries/emitter.js';

class CameraLogic {
  constructor(camera, render) {
    this.camera = camera;
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

  move(position) {
    this.camera.move(position);
  }

  centering() {
    const cameraElement = this.render.elements.get('camera');
    const cameraScreenElement = this.render.elements.get('cameraScreen');

    const position = {
      x: (cameraElement.clientWidth - cameraScreenElement.clientWidth) / 2,
      y: (cameraElement.clientHeight - cameraScreenElement.clientHeight) / 2,
    };

    this.move(position);
  }

  handleMouseDown(event) {
    const cameraElement = this.render.elements.get('camera');
    const cameraRect = cameraElement.getBoundingClientRect();

    this.mouse.down = true;
    this.mouse.offset = {
      x: event.clientX - this.camera.position.x - cameraRect.left,
      y: event.clientY - this.camera.position.y - cameraRect.top,
    };
  }

  handleMouseUp() {
    this.mouse.down = false;
    this.mouse.offset = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    if (this.mouse.down) {
      const position = {
        x: event.clientX - this.mouse.offset.x,
        y: event.clientY - this.mouse.offset.y,
      };

      this.move(position);
    }
  }
}

export default CameraLogic;
