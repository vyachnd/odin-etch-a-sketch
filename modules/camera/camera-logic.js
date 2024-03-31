import Emitter from '../../libraries/emitter.js';

class CameraLogic {
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
    this.render.emitter.on('handleKeyDown', this.handleKeyDown.bind(this));
    this.render.emitter.on('handleWheel', this.handleWheel.bind(this));
  }

  zoom(value) { this.entity.setZoom(value); }
  zoomIn() { this.entity.zoomIn(); }
  zoomOut() { this.entity.zoomOut(); }

  move(position) {
    this.entity.move(position);
  }

  centering() {
    const cameraElement = this.render.elements.get('camera');
    const cameraScreenElement = this.render.elements.get('cameraScreen');

    const position = {
      x: Math.floor((cameraElement.clientWidth - cameraScreenElement.clientWidth) / 2),
      y: Math.floor((cameraElement.clientHeight - cameraScreenElement.clientHeight) / 2),
    };

    this.move(position);
  }

  handleMouseDown(event) {
    const cameraElement = this.render.elements.get('camera');
    const cameraRect = cameraElement.getBoundingClientRect();

    this.mouse.down = true;
    this.mouse.offset = {
      x: event.clientX - this.entity.position.x - cameraRect.left,
      y: event.clientY - this.entity.position.y - cameraRect.top,
    };
  }

  handleMouseUp() {
    this.mouse.down = false;
    this.mouse.offset = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    if (this.mouse.down && this.entity.moveable) {
      const position = {
        x: event.clientX - this.mouse.offset.x,
        y: event.clientY - this.mouse.offset.y,
      };

      this.move(position);
    }
  }

  handleKeyDown(event) {
    const { ctrlKey, metaKey, key } = event;

    if ((ctrlKey || metaKey) && (key === '+' || key === '=')) this.zoomIn();
    if ((ctrlKey || metaKey) && (key === '-')) this.zoomOut();
    if ((ctrlKey || metaKey) && (key === '0')) this.zoom(1);
  }

  handleWheel(event) {
    const { ctrlKey, metaKey, deltaY } = event;

    if ((ctrlKey || metaKey) && deltaY < 0) this.zoomIn();
    if ((ctrlKey || metaKey) && deltaY > 0) this.zoomOut();
  }
}

export default CameraLogic;
