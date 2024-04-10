import CustomDivider from '../custom-elements/divider/divider.js';
import Plate from '../plate.js';

function Toolbar(tools) {
  const toolbarElement = new Plate({ cls: ['top', 'center'] });

  toolbarElement.addElement(tools.dragTool.button, 'dragTool');
  toolbarElement.addElement(tools.brushTool.button, 'brushTool');
  toolbarElement.addElement(tools.fillTool.button, 'fillTool');
  toolbarElement.addElement(tools.eraserTool.button, 'eraserTool');
  toolbarElement.addElement(tools.shadingTool.button, 'shadingTool');
  toolbarElement.addElement(tools.lightingTool.button, 'lightingTool');
  toolbarElement.addElement(new CustomDivider(), 'divider[1]');
  toolbarElement.addElement(tools.brushColorTool.button, 'brushColorTool');
  toolbarElement.addElement(tools.bgColorTool.button, 'bgColorTool');
  toolbarElement.addElement(tools.rainbowTool.button, 'rainbowTool');
  toolbarElement.addElement(new CustomDivider(), 'divider[2]');
  toolbarElement.addElement(tools.gridTool.button, 'gridTool');

  return toolbarElement;
}

export default Toolbar;
