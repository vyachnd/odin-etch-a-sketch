import debounce from '../../libraries/debounce.js';
import Emitter from '../../libraries/emitter.js';

class CameraRender {
  constructor(entity, options) {
    this.entity = entity;
    this.options = {
      cls: [],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.update = this.update.bind(this);
    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    entity.emitter.on('move', () => this.update());
  }

  get target() { return this.elements.get('camera'); }

  handleMouseDown(event) { this.emitter.fire('handleMouseDown', event); }
  handleMouseUp(event) { this.emitter.fire('handleMouseUp', event); }
  handleMouseMove(event) { this.emitter.fire('handleMouseMove', event); }

  update() {
    const camera = this.elements.get('camera');
    const cameraScreen = this.elements.get('cameraScreen');

    if (!camera && !this.entity) return null;

    const { position } = this.entity;

    if (camera.classList.length > 0) camera.className = '';
    camera.classList.add('camera', ...this.options.cls);

    cameraScreen.style.top = `${position.y}px`;
    cameraScreen.style.left = `${position.x}px`;
  }

  destroy() {
    const camera = this.elements.get('camera');

    window.removeEventListener('resize', this.update);

    if (camera) camera.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent && !this.entity) return null;

    let camera = this.elements.get('camera');

    if (!camera) {
      camera = document.createElement('div');
      this.elements.set('camera', camera);

      const cameraScreen = document.createElement('div');
      cameraScreen.classList.add('camera__screen');
      this.elements.set('cameraScreen', cameraScreen);

      camera.append(cameraScreen);

      camera.addEventListener('mousedown', this.handleMouseDown);
      camera.addEventListener('mouseup', this.handleMouseUp);
      camera.addEventListener('mousemove', this.handleMouseMove);
    }

    this.update();

    this.parent = parent;
    this.parent.append(camera);
  }
}

export default CameraRender;
