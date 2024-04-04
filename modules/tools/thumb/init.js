import CustomButton from '../../custom-elements/button/button.js';
import ToolThumb from './thumb.js';

function toolThumbInit(board) {
  const toolThumb = new ToolThumb(board);
  const toolThumbBtn = new CustomButton({
    icon: 'brush',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    if (!toolThumb.target) toolThumb.render(board.target);

    toolThumbBtn.setVariant('secondary');
    toolThumbBtn.setFill(true);
  }

  function onDisable() {
    toolThumbBtn.setVariant(null);
    toolThumbBtn.setFill(false);
  }

  toolThumb.emitter.on('enable', onEnable);
  toolThumb.emitter.on('disable', onDisable);
  toolThumb.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolThumbBtn.emitter.on('handleClick', () => toolThumb.toggle());

  return { toolThumb, toolThumbBtn };
}

export default toolThumbInit;
