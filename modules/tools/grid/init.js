import CustomButton from '../../custom-elements/button/button.js';
import ToolGrid from './grid.js';

function toolGridInit(board) {
  const tool = new ToolGrid(board);
  const button = new CustomButton({
    icon: 'grid_4x4',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  function onEnable() {
    if (!tool.target) tool.render(board.target);

    button.setVariant('secondary');
    button.setFill(true);
    button.setTransparent(true);
  }

  function onDisable() {
    button.setVariant(null);
    button.setFill(false);
  }

  tool.emitter.on('enable', onEnable);
  tool.emitter.on('disable', onDisable);

  button.emitter.on('handleClick', () => tool.toggle());

  return { tool, button };
}

export default toolGridInit;
