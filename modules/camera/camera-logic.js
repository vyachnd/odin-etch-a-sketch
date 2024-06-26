class CameraLogic {
  constructor(entity, render) {
    this._entity = entity;
    this._render = render;

    this.emitter.on('handleWheel', this.handleWheel.bind(this));
    this.emitter.on('handleKeyDown', this.handleKeyDown.bind(this));
    this.emitter.on('handleMouseDown', this.handleMouseDown.bind(this));
    this.emitter.on('handleMouseUp', this.handleMouseUp.bind(this));
    this.emitter.on('handleMouseMove', this.handleMouseMove.bind(this));
  }

  get emitter() { return this._entity.emitter; }
  get target() { return this._render.target; }
  get center() { return this._render.center; }

  get position() { return this._entity.position; }
  get zoom() { return this._entity.zoom; }
  get moveable() { return this._entity.moveable; }
  get zoomable() { return this._entity.zoomable; }

  #isCtrlKey(event) {
    const { ctrlKey, metaKey } = event;
    return (ctrlKey || metaKey);
  }

  calculatePosition(clientX, clientY) {
    const cameraRect = this.target.getBoundingClientRect();
    const cameraPosition = this._entity.position;

    return {
      x: clientX - cameraPosition.x - cameraRect.left,
      y: clientY - cameraPosition.y - cameraRect.top,
    };
  }

  destroy() { this._render.destroy(); }
  render(parent) { this._render.render(parent); }

  addEntity(entity) { return this._entity.addEntity(entity); }

  setZoom(value) { this._entity.setZoom(value); }
  zoomIn() { this._entity.onZoomIn(); }
  zoomOut() { this._entity.onZoomOut(); }
  zoomReset() { this._entity.onZoomReset(); }

  setPosition(position) { this._entity.setPosition(position); }
  move(position) { this._entity.onMove(position); }

  setMoveable(moveable) { this._entity.setMoveable(moveable); }
  setZoomable(zoomable) { this._entity.setZoomable(zoomable); }

  handleWheel(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.setMouse({ position, event });

    if (this.#isCtrlKey(event) && event.deltaY < 0) this._entity.onZoomIn(event);
    if (this.#isCtrlKey(event) && event.deltaY > 0) this._entity.onZoomOut(event);
  }
  handleKeyDown(event) {
    if (this.#isCtrlKey(event) && (event.key === '+' || event.key === '=')) this._entity.onZoomIn(event);
    if (this.#isCtrlKey(event) && (event.key === '-')) this._entity.onZoomOut(event);
    if (this.#isCtrlKey(event) && (event.key === '0')) this._entity.onZoomReset(event);
  }
  handleMouseDown(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseDown(position, event);
  }
  handleMouseUp(event) {
    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseUp(position, event);
  }
  handleMouseMove(event) {
    event.preventDefault();

    const position = this.calculatePosition(event.clientX, event.clientY);
    this._entity.onMouseMove(position, event);

    const mouse = this._entity.mouse;

    if (mouse.down && (mouse.button === 0 || mouse.button === 1)) {
      this.move({
        x: event.clientX - this._entity.mouse.offset.x,
        y: event.clientY - this._entity.mouse.offset.y,
      });
    }
  }
}

export default CameraLogic;
