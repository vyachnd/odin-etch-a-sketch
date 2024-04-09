import CustomButton from '../../custom-elements/button/button.js';
import ToolBrush from './brush.js';

function toolBrushInit(board) {
  const tool = new ToolBrush(board);
  const button = new CustomButton({
    icon: 'brush',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    button.setVariant('secondary');
    button.setFill(true);
  }

  function onDisable() {
    button.setVariant(null);
    button.setFill(false);
  }

  tool.emitter.on('enable', onEnable);
  tool.emitter.on('disable', onDisable);

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, button };
}

export default toolBrushInit;
