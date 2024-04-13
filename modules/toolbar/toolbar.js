import CustomDivider from '../custom-elements/divider/divider.js';
import Plate from '../plate.js';

function Toolbar(tools) {
  const toolbarElement = new Plate({ cls: ['plate_toolbar', 'top', 'center'] });

  toolbarElement.addElement(tools.dragTool.element, 'dragTool');
  toolbarElement.addElement(tools.brushTool.element, 'brushTool');
  toolbarElement.addElement(tools.fillTool.element, 'fillTool');
  toolbarElement.addElement(tools.eraserTool.element, 'eraserTool');
  toolbarElement.addElement(tools.shadingTool.element, 'shadingTool');
  toolbarElement.addElement(tools.lightingTool.element, 'lightingTool');
  toolbarElement.addElement(new CustomDivider(), 'divider[1]');
  toolbarElement.addElement(tools.brushColorTool.element, 'brushColorTool');
  toolbarElement.addElement(tools.bgColorTool.element, 'bgColorTool');
  toolbarElement.addElement(tools.rainbowTool.element, 'rainbowTool');
  toolbarElement.addElement(new CustomDivider(), 'divider[2]');
  toolbarElement.addElement(tools.gridTool.element, 'gridTool');
  toolbarElement.addElement(tools.sizeTool.element, 'sizeTool');

  return toolbarElement;
}

export default Toolbar;
