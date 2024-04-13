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
    button.setOptions({
      variant: 'secondary',
      fill: true,
    });
  }

  function onDisable() {
    button.setOptions({
      variant: null,
      fill: false,
    });
  }

  tool.emitter.on('enable', onEnable);
  tool.emitter.on('disable', onDisable);

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, element: button };
}

export default toolBrushInit;
