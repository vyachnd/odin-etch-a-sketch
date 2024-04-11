/*
  TODO:
    - [ ] Grid size change tool

    - [ ] History redo/undo
    - [ ] Move camera on board center
    - [ ] Save board as image
*/

// Helper functions
import unzoom from './libraries/unzoom.js';
import fontsMSPreload from './modules/custom-elements/materialSymbols.js';

// Custom Elements
import CustomButton from './modules/custom-elements/button/button.js';
import CustomHeader from './modules/custom-elements/header/header.js';
import CustomIcon from './modules/custom-elements/icon/icon.js';

// Tools
import Board from './modules/board/board.js';
import Camera from './modules/camera/camera.js';
import Toolbar from './modules/toolbar/toolbar.js';
import initTools from './modules/tools/init.js';

function initApp() {
  // App element
  const appElement = document.createElement('div');
  appElement.id = 'app';

  document.body.prepend(appElement);

  // Create Camera and Board
  const camera = new Camera();
  const board = new Board({ entity: { grid: { rows: 16, cols: 16 } } });

  camera.render(appElement);
  camera.addEntity(board);

  board.move({
    x: -board.target.offsetWidth / 2,
    y: -board.target.offsetHeight / 2,
  });

  camera.move(camera.fieldCenter);

  // Initialize Tools
  const tools = new initTools(camera, board);

  // Header
  const headerElement = new CustomHeader({
    heading: 'Etch-A-Sketch'.toUpperCase(),
    subheading: 'by ${vyachnd}',
    url: 'https://github.com/vyachnd',
    icon: new CustomIcon({ type: 'rounded', fill: true, opsz: 40, icon: 'palette' }),
    cls: ['top', 'left'],
  });
  headerElement.render(appElement);

  // Toolbar
  const toolbar = new Toolbar(tools);
  toolbar.render(appElement);

  // Clear button
  const clearButton = new CustomButton({
    text: 'Clear',
    icon: 'restart_alt',
    cls: ['top', 'right'],
    transparent: true,
    disabled: true,
  });
  clearButton.render(appElement);
  clearButton.emitter.on('handleClick', () => board.clear());

  function toggleClearButton() {
    if (board.cellCount === 0 && !clearButton.options.disabled) clearButton.setDisabled(true);
    if (board.cellCount > 0 && clearButton.options.disabled) clearButton.setDisabled(false);
  }

  board.emitter.on('onClear', toggleClearButton);
  board.emitter.on('onErase', toggleClearButton);
  board.emitter.on('onBrush', toggleClearButton);
  board.emitter.on('onFill', toggleClearButton);

  // Zoom buttons
  const zoomBtnsCotaniner = document.createElement('div');
  zoomBtnsCotaniner.classList.add('zoom-btns-container', 'flex', 'bottom', 'center');

  const zoomOutBtn = new CustomButton({
    icon: 'zoom_out',
    iconOnly: true,
    transparent: true,
    disabled: true,
  });

  const zoomResetBtn = new CustomButton({
    text: '100%',
    transparent: true,
  });

  const zoomInBtn = new CustomButton({
    icon: 'zoom_in',
    iconOnly: true,
    transparent: true,
    disabled: true,
  });
  zoomOutBtn.emitter.on('handleClick', () => camera.zoomOut());
  zoomResetBtn.emitter.on('handleClick', () => camera.zoomReset());
  zoomInBtn.emitter.on('handleClick', () => camera.zoomIn());

  function toggleZoomButtons() {
    const { min, max, current } = camera.zoom;

    zoomOutBtn.setDisabled(current <= min);
    zoomInBtn.setDisabled(current >= max);

    zoomResetBtn.setText(`${Math.round(current * 100)}%`);
  }

  camera.emitter.on('setZoom', toggleZoomButtons);
  camera.emitter.on('setZoomable', toggleZoomButtons);
  camera.emitter.on('onZoomIn', toggleZoomButtons);
  camera.emitter.on('onZoomOut', toggleZoomButtons);
  camera.emitter.on('onZoomReset', toggleZoomButtons);

  toggleZoomButtons();

  zoomOutBtn.render(zoomBtnsCotaniner);
  zoomResetBtn.render(zoomBtnsCotaniner);
  zoomInBtn.render(zoomBtnsCotaniner);
  appElement.append(zoomBtnsCotaniner);

  // Histroy
  tools.historyTool.button.render(appElement);
}

unzoom(window);
fontsMSPreload(initApp);
