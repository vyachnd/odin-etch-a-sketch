import Emitter from '../../libraries/emitter.js';

class BoardRender {
  constructor(board) {
    this.board = board;
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.mouseDown = false;
    this.mouseOffset = { x: 0, y: 0 };

    this.handleWheelZoom = this.handleWheelZoom.bind(this);
    this.handleKeyZoom = this.handleKeyZoom.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.update = this.update.bind(this);
    this.toCenter = this.toCenter.bind(this);

    this.board.emitter.sub('zoomIn', this.update);
    this.board.emitter.sub('zoomOut', this.update);
    this.board.emitter.sub('zoomReset', this.update);
    this.board.emitter.sub('moveTo', this.update);
    this.board.emitter.sub('moveOn', this.update);
    this.board.emitter.sub('moveToCenter', this.toCenter);
  }

  get target() { return this.elements.get('board'); }

  handleWheelZoom(event) {
    // const { ctrlKey, metaKey, deltaY } = event;

    // if ((ctrlKey || metaKey)) event.preventDefault();
    // if ((ctrlKey || metaKey) && deltaY > 0) this.board.zoomOut();
    // if ((ctrlKey || metaKey) && deltaY < 0) this.board.zoomIn();

    this.emitter.fire('handleWheelZoom', event);
  }

  handleKeyZoom(event) {
    // const { ctrlKey, metaKey, key } = event;
    // const isZoomOut = key === '-';
    // const isZoomIn = (key === '+' || key === '=');

    // if ((ctrlKey || metaKey) && (isZoomOut || isZoomIn)) event.preventDefault();
    // if ((ctrlKey || metaKey) && isZoomOut) this.board.zoomOut();
    // if ((ctrlKey || metaKey) && isZoomIn) this.board.zoomIn();
    // if ((ctrlKey || metaKey) && key === '0') this.board.zoomReset();

    this.emitter.fire('handleKeyZoom', event);
  }

  handleMouseDown(event) {
    this.mouseDown = true;
    this.mouseOffset = {
      x: event.clientX - this.board.position.x,
      y: event.clientY - this.board.position.y,
    };

    this.emitter.fire('handleMouseDown', event);
  }

  handleMouseUp(event) {
    this.mouseDown = false;
    this.mouseOffset = { x: 0, y: 0, };

    this.emitter.fire('handleMouseUp', event);
  }

  handleMouseMove(event) {
    // if (!this.mouseDown) return;

    // this.board.moveTo(
    //   event.clientX - this.mouseOffset.x,
    //   event.clientY - this.mouseOffset.y
    // );

    this.emitter.fire('handleMouseMove', event);
  }

  toCenter() {
    const { width, height } = this.board.size;

    this.board.moveTo(
      this.parent.offsetWidth / 2 - width / 2,
      this.parent.offsetHeight / 2 - height / 2,
    );
  }

  update() {
    const { size, zoom, position } = this.board;
    const boardElement = this.elements.get('board');
    const offsets = {
      width: Math.floor((size.width * zoom - size.width) / 2),
      height: Math.floor((size.height * zoom - size.height) / 2),
    };
    const newPosition = {
      x: (position.x + offsets.width) - offsets.width,
      y: (position.y + offsets.height) - offsets.height,
    };

    const widthOverflow = Math.max(0, Math.floor(size.width * zoom) - this.parent.offsetWidth);
    const heightOverflow = Math.max(0, Math.floor(size.height * zoom) - this.parent.offsetHeight);

    if (newPosition.x - offsets.width < 0 - widthOverflow) {
      newPosition.x = offsets.width - widthOverflow;
      this.board.position.x = newPosition.x;
    }
    if (newPosition.x > this.parent.offsetWidth - (size.width * zoom) + offsets.width + widthOverflow) {
      newPosition.x = this.parent.offsetWidth - (size.width * zoom) + offsets.width + widthOverflow;
      this.board.position.x = newPosition.x;
    }

    if (newPosition.y < offsets.height - heightOverflow) {
      newPosition.y = offsets.height - heightOverflow;
      this.board.position.y = newPosition.y;
    }
    if (newPosition.y > this.parent.offsetHeight - (size.height * zoom) + offsets.height + heightOverflow) {
      newPosition.y = this.parent.offsetHeight - (size.height * zoom) + offsets.height + heightOverflow;
      this.board.position.y = newPosition.y;
    }

    boardElement.style.scale = zoom;
    boardElement.style.left = `${newPosition.x}px`;
    boardElement.style.top = `${newPosition.y}px`;
  }

  render(parent) {
    if (!parent) return null;
    if (!this.elements.has('board')) this.elements.set('board', document.createElement('div'));

    const { width, height } = this.board.size;
    const boardElement = this.elements.get('board');
    boardElement.classList.add('board');
    boardElement.style.width = `${width}px`;
    boardElement.style.height = `${height}px`;

    this.parent = parent;
    this.parent.append(boardElement);

    window.addEventListener('resize', this.update);
    window.addEventListener('wheel', this.handleWheelZoom);
    window.addEventListener('keydown', this.handleKeyZoom);

    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
}

export default BoardRender;
