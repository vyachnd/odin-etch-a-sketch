import CustomButton from '../../custom-elements/button/button.js';
import ToolRainbow from './rainbow.js';

function toolRainbowInit(board, toolColor) {
  const tool = new ToolRainbow(board, toolColor.tool);
  const button = new CustomButton({
    icon: 'looks',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    button.setOptions({
      variant: 'secondary',
      fill: true,
      transparent: true,
    });

    toolColor.element.setOptions({ disabled: true });

    tool.reset();
    tool.changeColor();
  }

  function onDisable() {
    button.setOptions({
      variant: null,
      fill: false,
      transparent: false,
    });

    toolColor.element.setOptions({ disabled: false });
  }

  tool.emitter.on('enable', onEnable);
  tool.emitter.on('disable', onDisable);

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, element: button };
}

export default toolRainbowInit;
