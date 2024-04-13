import CustomButton from '../../custom-elements/button/button.js';
import ToolThumb from './thumb.js';

function toolThumbInit(board) {
  const tool = new ToolThumb(board);
  const button = new CustomButton({
    icon: 'target',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    if (!tool.target) tool.render(board.target);

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
  tool.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, element: button };
}

export default toolThumbInit;
