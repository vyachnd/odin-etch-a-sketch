import { rgbToHex } from '../../libraries/helpers.js';
import toolAdjustColorInit from './adjustColor/init.js';
import toolBrushInit from './brush/init.js';
import toolClearInit from './clear/init.js';
import toolColorInit from './color/init.js';
import toolDragInit from './drag/init.js';
import toolEraserInit from './eraser/init.js';
import toolFillInit from './fill/init.js';
import toolGridInit from './grid/init.js';
import toolHistoryInit from './history/init.js';
import toolRainbowInit from './rainbow/init.js';
import toolSaveInit from './save/init.js';
import toolSizeInit from './size/init.js';
import toolThumbInit from './thumb/init.js';
import toolZoomInit from './zoom/init.js';

function initTools(camera, board) {
  const brushColorTool = new toolColorInit({ r: 56, g: 189, b: 248, a: 1 });
  const bgColorTool = new toolColorInit({ r: 9, g: 9, b: 11, a: 0.24 });

  const dragTool = new toolDragInit(camera);
  const thumbTool = new toolThumbInit(board);
  const gridTool = new toolGridInit(board);
  const sizeTool = new toolSizeInit(board);

  const brushTool = new toolBrushInit(board);
  const fillTool = new toolFillInit(board);
  const eraserTool = new toolEraserInit(board);
  const shadingTool = new toolAdjustColorInit(board);
  const lightingTool = new toolAdjustColorInit(board);
  const rainbowTool = new toolRainbowInit(board, brushColorTool);

  const historyTool = new toolHistoryInit(board);
  const zoomTool = new toolZoomInit(camera);
  const clearTool = new toolClearInit(board);
  const saveTool = new toolSaveInit(board);

  let currentTool = null;
  const toggledTools = [
    dragTool, brushTool, fillTool,
    eraserTool, shadingTool, lightingTool,
  ];

  shadingTool.tool.setFactor(-10);
  shadingTool.element.setOptions({ icon: 'ev_shadow_minus' });

  lightingTool.tool.setFactor(10);
  lightingTool.element.setOptions({ icon: 'ev_shadow_add' });

  // Change brush and fill color
  function changeBrushFillColor(rgba) {
    brushTool.tool.setColor(rgba);
    fillTool.tool.setColor(rgba);
  }

  // Change board background color
  function changeBoardColor(rgba) {
    board.target.style.backgroundColor = rgbToHex(Object.assign({}, rgba), 0.24);
  }

  for (const tool of toggledTools) {
    tool.tool.emitter.on('enable', () => {
      if (currentTool && currentTool !== tool) currentTool.tool.disable();

      if (tool === dragTool) {
        thumbTool.tool.disable();
      } else {
        thumbTool.tool.enable();
      }

      currentTool = tool;
    });
  }

  dragTool.tool.emitter.on('disable', () => thumbTool.tool.enable());

  gridTool.tool.enable();
  thumbTool.tool.enable();
  dragTool.tool.enable();

  brushColorTool.tool.emitter.on('onChange', changeBrushFillColor);
  bgColorTool.tool.emitter.on('onChange', changeBoardColor);

  changeBrushFillColor(brushColorTool.tool.color);
  changeBoardColor(bgColorTool.tool.color);

  return {
    brushColorTool,
    bgColorTool,
    dragTool,
    thumbTool,
    gridTool,
    sizeTool,
    brushTool,
    fillTool,
    eraserTool,
    shadingTool,
    lightingTool,
    rainbowTool,
    historyTool,
    zoomTool,
    clearTool,
    saveTool,
  };
}

export default initTools;
