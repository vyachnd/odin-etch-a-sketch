import CustomButton from '../../custom-elements/button/button.js';
import ToolDrag from './drag.js';

function toolDragInit(camera) {
  const tool = new ToolDrag(camera);
  const button = new CustomButton({
    icon: 'drag_pan',
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

export default toolDragInit;
