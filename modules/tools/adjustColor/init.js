import CustomButton from '../../custom-elements/button/button.js';
import ToolAdjustColor from './adjustColor.js';

function toolAdjustColorInit(board) {
  const toolAdjustColor = new ToolAdjustColor(board);
  const toolAdjustColorBtn = new CustomButton({
    icon: 'square',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    toolAdjustColorBtn.setVariant('secondary');
    toolAdjustColorBtn.setFill(true);
  }

  function onDisable() {
    toolAdjustColorBtn.setVariant(null);
    toolAdjustColorBtn.setFill(false);
  }

  toolAdjustColor.emitter.on('enable', onEnable);
  toolAdjustColor.emitter.on('disable', onDisable);
  toolAdjustColor.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolAdjustColorBtn.emitter.on('handleClick', () => toolAdjustColor.toggle());

  return {
    tool: toolAdjustColor,
    button: toolAdjustColorBtn,
  };
}

export default toolAdjustColorInit;
