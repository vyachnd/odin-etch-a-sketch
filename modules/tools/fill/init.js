import CustomButton from '../../custom-elements/button/button.js';
import ToolFill from './fill.js';

function toolFillInit(board) {
  const toolFill = new ToolFill(board);
  const toolFillBtn = new CustomButton({
    icon: 'colors',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    toolFillBtn.setVariant('secondary');
    toolFillBtn.setFill(true);
  }

  function onDisable() {
    toolFillBtn.setVariant(null);
    toolFillBtn.setFill(false);
  }

  toolFill.emitter.on('enable', onEnable);
  toolFill.emitter.on('disable', onDisable);
  toolFill.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolFillBtn.emitter.on('handleClick', () => toolFill.toggle());

  return { toolFill, toolFillBtn };
}

export default toolFillInit;
