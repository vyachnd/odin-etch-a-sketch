import CustomButton from '../../custom-elements/button/button.js';
import ToolEraser from './eraser.js';

function toolEraserInit(board) {
  const tool = new ToolEraser(board);
  const button = new CustomButton({
    icon: 'ink_eraser',
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

export default toolEraserInit;
