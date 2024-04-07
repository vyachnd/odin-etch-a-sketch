import CustomButton from '../../custom-elements/button/button.js';
import ToolBrush from './brush.js';

function toolBrushInit(board, toolColor) {
  const toolBrush = new ToolBrush(board, toolColor);
  const toolBrushBtn = new CustomButton({
    icon: 'brush',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    toolBrushBtn.setVariant('secondary');
    toolBrushBtn.setFill(true);
  }

  function onDisable() {
    toolBrushBtn.setVariant(null);
    toolBrushBtn.setFill(false);
  }

  toolBrush.emitter.on('enable', onEnable);
  toolBrush.emitter.on('disable', onDisable);
  toolBrush.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolBrushBtn.emitter.on('handleClick', () => toolBrush.toggle());

  return { toolBrush, toolBrushBtn };
}

export default toolBrushInit;
