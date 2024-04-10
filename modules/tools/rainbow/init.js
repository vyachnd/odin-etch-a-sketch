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
    button.setVariant('secondary');
    button.setFill(true);
    button.setTransparent(true);

    toolColor.button.setDisabled(true);

    tool.reset();
    tool.changeColor();
  }

  function onDisable() {
    button.setVariant(null);
    button.setFill(false);
    button.setTransparent(false);

    toolColor.button.setDisabled(false);
  }

  tool.emitter.on('enable', onEnable);
  tool.emitter.on('disable', onDisable);

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, button };
}

export default toolRainbowInit;
