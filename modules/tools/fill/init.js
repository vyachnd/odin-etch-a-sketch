import CustomButton from '../../custom-elements/button/button.js';
import ToolFill from './fill.js';

function toolFillInit(board) {
  const tool = new ToolFill(board);
  const button = new CustomButton({
    icon: 'colors',
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

export default toolFillInit;
