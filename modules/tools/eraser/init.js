import CustomButton from '../../custom-elements/button/button.js';
import ToolEraser from './eraser.js';

function toolEraserInit(board) {
  const toolEraser = new ToolEraser(board);
  const toolEraserBtn = new CustomButton({
    icon: 'ink_eraser',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    toolEraserBtn.setVariant('secondary');
    toolEraserBtn.setFill(true);
  }

  function onDisable() {
    toolEraserBtn.setVariant(null);
    toolEraserBtn.setFill(false);
  }

  toolEraser.emitter.on('enable', onEnable);
  toolEraser.emitter.on('disable', onDisable);
  toolEraser.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolEraserBtn.emitter.on('handleClick', () => toolEraser.toggle());

  return { toolEraser, toolEraserBtn };
}

export default toolEraserInit;
