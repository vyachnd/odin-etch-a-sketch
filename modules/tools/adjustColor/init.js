import CustomButton from '../../custom-elements/button/button.js';
import ToolAdjustColor from './adjustColor.js';

function toolAdjustColorInit(board) {
  const tool = new ToolAdjustColor(board);
  const button = new CustomButton({
    icon: 'square',
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

  return { tool, element: button };
}

export default toolAdjustColorInit;
