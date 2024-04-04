import debounce from '../../libraries/debounce.js';

class CameraRender {
  constructor(entity, options) {
    this._entity = entity;
    this.options = {
      cls: [],
      rect: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      ...options,
    };
    this.parent = null;
    this.elements = new Map();

    this.update = this.update.bind(this);
    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleWheel = this.handleWheel.bind(this);

    this.emitter.on('addEntity', (entity) => this.addEntity(entity));
    this.emitter.on('setZoom', this.update);
    this.emitter.on('onMove', this.update);
    this.emitter.on('onZoomIn', this.update);
    this.emitter.on('onZoomOut', this.update);
    this.emitter.on('onZoomReset', this.update);
  }

  get emitter() { return this._entity.emitter; }
  get target() { return this.elements.get('camera'); }
  get cameraCenter() {
    const { width, height } = this.target.getBoundingClientRect();

    return {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    };
  }
  get fieldCenter() {
    const { x, y } = this.cameraCenter;
    const { left, top, width, height } = this.options.rect;
    const { current: currentZoom } = this._entity.zoom;
    const offset = {
      left: left * currentZoom - left,
      top: top * currentZoom - top,
    };

    return {
      x: Math.floor(-left - offset.left + x - width * currentZoom / 2),
      y: Math.floor(-top - offset.top + y - height * currentZoom / 2),
    };
  }

  handleWheel(event) { this.emitter.fire('handleWheel', event); }
  handleKeyDown(event) { this.emitter.fire('handleKeyDown', event); }
  handleMouseDown(event) { this.emitter.fire('handleMouseDown', event); }
  handleMouseUp(event) { this.emitter.fire('handleMouseUp', event); }
  handleMouseMove(event) { this.emitter.fire('handleMouseMove', event); }

  addEntity(entity) {
    const self = this;
    const cameraField = this.elements.get('cameraField');
    entity.render(cameraField);

    function updateRect() {
      const entityRect = entity.target.getBoundingClientRect();
      const optionsRect = self.options.rect;

      if (entityRect.top !== optionsRect.top) self.options.rect.top = entityRect.top;
      if (entityRect.right !== optionsRect.right) self.options.rect.right = entityRect.right;
      if (entityRect.bottom !== optionsRect.bottom) self.options.rect.bottom = entityRect.bottom;
      if (entityRect.left !== optionsRect.left) self.options.rect.left = entityRect.left;

      self.options.rect.width = entityRect.right - entityRect.left;
      self.options.rect.height = entityRect.bottom - entityRect.top;
    }

    entity.emitter.on('onMove', () => updateRect());

    updateRect();

    this.update();
  }

  update() {
    const camera = this.elements.get('camera');
    const cameraField = this.elements.get('cameraField');

    if (!camera || !this._entity) return null;

    const position = this._entity.position;
    const zoom = this._entity.zoom;

    if (camera.classList.length > 0) camera.className = '';
    camera.classList.add('camera', ...this.options.cls);

    cameraField.style.top = `${position.y}px`;
    cameraField.style.left = `${position.x}px`;
    cameraField.style.transform = `scale(${zoom.current})`;
  }

  destroy() {
    const camera = this.elements.get('camera');

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);

    if (camera) camera.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent || !this._entity) return null;

    let camera = this.elements.get('camera');

    if (!camera) {
      camera = document.createElement('div');
      camera.tabIndex = 0;
      this.elements.set('camera', camera);

      const cameraField = document.createElement('div');
      cameraField.classList.add('camera__field');
      this.elements.set('cameraField', cameraField);

      camera.append(cameraField);

      camera.addEventListener('wheel', this.handleWheel);
      camera.addEventListener('keydown', this.handleKeyDown);
      camera.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    this.update();

    this.parent = parent;
    this.parent.append(camera);
  }
}

export default CameraRender;
