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

export default toolFillInit;
