/*
  TODO:
    - [x] Brush tool
    - [x] Fill tool
    - [x] Eraser tool
    - [x] Shading tool
    - [x] Lighting tool
    - [x] Color selector tool
    - [x] Background color selector tool
    - [ ] Rainbow color tool
    - [ ] Grid size change tool

    - [ ] History redo/undo
    - [ ] Zoom in/reset/out
    - [ ] Move camera on board center
    - [ ] Clear board
    - [ ] Save board as image
*/

// Helper functions
import unzoom from './libraries/unzoom.js';
import fontsMSPreload from './modules/custom-elements/materialSymbols.js';

// Elements
import Board from './modules/board/board.js';
import Camera from './modules/camera/camera.js';
import CustomHeader from './modules/custom-elements/header/header.js';
import CustomIcon from './modules/custom-elements/icon/icon.js';

// Tools
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
}

unzoom(window);
fontsMSPreload(initApp);
