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

  camera.emitter.on('onMouseDown', () => {
    const mouse = camera.mouse;

    if (!tool.isEnabled && mouse.button === 1) camera.setMoveable(true);
  });
  camera.emitter.on('onMouseUp', () => {
    if (!tool.isEnabled) camera.setMoveable(false);
  });
  camera.emitter.on('onMouseMove', (event) => {
    const mouse = camera.mouse;

    if (mouse.down && mouse.button === 1) {
      camera.move({
        x: event.clientX - mouse.offset.x,
        y: event.clientY - mouse.offset.y,
      });
    }
  });

  tool.emitter.on('enable', onEnable);
  tool.emitter.on('disable', onDisable);

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, element: button };
}

export default toolDragInit;
