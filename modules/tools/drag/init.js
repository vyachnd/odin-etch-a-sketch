import CustomButton from '../../custom-elements/button/button.js';
import ToolDrag from './drag.js';

function toolDragInit(camera) {
  const toolDrag = new ToolDrag(camera);
  const toolDragBtn = new CustomButton({
    icon: 'drag_pan',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    toolDragBtn.setVariant('secondary');
    toolDragBtn.setFill(true);
  }

  function onDisable() {
    toolDragBtn.setVariant(null);
    toolDragBtn.setFill(false);
  }

  toolDrag.emitter.on('enable', onEnable);
  toolDrag.emitter.on('disable', onDisable);
  toolDrag.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolDragBtn.emitter.on('handleClick', () => toolDrag.toggle());

  return { toolDrag, toolDragBtn };
}

export default toolDragInit;
