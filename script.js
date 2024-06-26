// Helper functions
import unzoom from './libraries/unzoom.js';
import fontsMSPreload from './modules/custom-elements/materialSymbols.js';

// Custom Elements
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
  const board = new Board({ entity: { grid: { rows: 24, cols: 24 } } });

  camera.render(appElement);
  camera.addEntity(board);

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

  // Clear tool
  tools.clearTool.element.render(appElement);

  // Zoom tool
  tools.zoomTool.element.render(appElement);

  // History tool
  tools.historyTool.element.render(appElement);

  // Save tool
  tools.saveTool.element.render(appElement);

  // Center tool
  tools.centerTool.element.render(appElement);

  board.emitter.on('onSetGrid', () => tools.centerTool.tool.center());
  tools.centerTool.tool.center();
}

unzoom(window);
fontsMSPreload(initApp);
