import CustomButton from '../../custom-elements/button/button.js';
import ToolGrid from './grid.js';

function toolGridInit(board) {
  const toolGrid = new ToolGrid(board);
  const toolGridBtn = new CustomButton({
    icon: 'grid_4x4',
    iconOnly: true,
    variant: null,
    fill: false,
  });

  board.target.style.backgroundColor = 'rgba(248, 250, 252, 0.024)';

  function onEnable() {
    if (!toolGrid.target) toolGrid.render(board.target);

    toolGridBtn.setVariant('secondary');
    toolGridBtn.setFill(true);
    toolGridBtn.setTransparent(true);
  }

  function onDisable() {
    toolGridBtn.setVariant(null);
    toolGridBtn.setFill(false);
  }

  toolGrid.emitter.on('enable', onEnable);
  toolGrid.emitter.on('disable', onDisable);
  toolGrid.emitter.on('toggle', (value) => {
    if (value) onEnable();
    if (!value) onDisable();
  });

  toolGridBtn.emitter.on('handleClick', () => toolGrid.toggle());

  return { toolGrid, toolGridBtn };
}

export default toolGridInit;
