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
import Plate from './modules/plate.js';

// Tools
import { rgbaToHex } from './libraries/helpers.js';
import toolAdjustColorInit from './modules/tools/adjustColor/init.js';
import toolBrushInit from './modules/tools/brush/init.js';
import toolColorInit from './modules/tools/color/init.js';
import toolDragInit from './modules/tools/drag/init.js';
import toolEraserInit from './modules/tools/eraser/init.js';
import toolFillInit from './modules/tools/fill/init.js';
import toolGridInit from './modules/tools/grid/init.js';
import toolThumbInit from './modules/tools/thumb/init.js';

function initApp() {
  // App
  const appElement = document.createElement('div');
  appElement.id = 'app';
  document.body.prepend(appElement);

  // Create camera and board
  const camera = new Camera();
  const board = new Board({ entity: { grid: { rows: 16, cols: 16 } } });

  camera.render(appElement);
  camera.addEntity(board);

  board.move({
    x: -board.target.offsetWidth / 2,
    y: -board.target.offsetHeight / 2,
  });

  camera.move(camera.fieldCenter);

  // Tools
  const { toolColor, toolColorBtn } = new toolColorInit(board);
  const { toolColor: toolColorBg, toolColorBtn: toolColorBgBtn } = new toolColorInit(board);

  const { toolDrag, toolDragBtn } = new toolDragInit(camera);
  const { toolThumb, toolThumbBtn } = new toolThumbInit(board);
  const { toolGrid, toolGridBtn } = new toolGridInit(board);
  const { toolBrush, toolBrushBtn } = new toolBrushInit(board, toolColor);
  const { toolFill, toolFillBtn } = new toolFillInit(board, toolColor);
  const { toolEraser, toolEraserBtn } = new toolEraserInit(board);
  const shadingTool = new toolAdjustColorInit(board);
  const lightingTool = new toolAdjustColorInit(board);

  toolDrag.disable();
  toolThumb.enable();
  toolGrid.enable();
  toolBrush.enable();
  toolFill.enable();
  toolEraser.enable();


  shadingTool.tool.enable();
  shadingTool.tool.setFactor(-10);
  shadingTool.button.setIcon('ev_shadow_minus');

  lightingTool.tool.enable();
  lightingTool.tool.setFactor(10);
  lightingTool.button.setIcon('ev_shadow_add');

  toolColorBg.emitter.on('onChange', (rgba) => changeBoardColor(rgba));

  // Change board background color
  function changeBoardColor(rgba) {
    board.target.style.backgroundColor = rgbaToHex(Object.assign({}, rgba, { a: 0.24 }));
  }
  toolColorBg.change({ r: 24, g: 24, b: 27 });

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
  const toolbarElement = new Plate({
    cls: ['top', 'center'],
  });
  toolbarElement.render(appElement);
  toolbarElement.addElement(toolDragBtn, 'toolDragBtn');
  toolbarElement.addElement(toolThumbBtn, 'toolThumbBtn');
  toolbarElement.addElement(toolGridBtn, 'toolGridBtn');
  toolbarElement.addElement(toolBrushBtn, 'toolBrushBtn');
  toolbarElement.addElement(toolFillBtn, 'toolFillBtn');
  toolbarElement.addElement(toolEraserBtn, 'toolEraserBtn');
  toolbarElement.addElement(toolColorBtn, 'toolColorBtn');
  toolbarElement.addElement(toolColorBgBtn, 'toolColorBgBtn');

  toolbarElement.addElement(shadingTool.button, 'shadingTool');
  toolbarElement.addElement(lightingTool.button, 'lightingTool');
}

unzoom(window);
fontsMSPreload(initApp);
