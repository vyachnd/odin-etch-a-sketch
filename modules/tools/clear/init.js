import CustomButton from '../../custom-elements/button/button.js';
import Plate from '../../plate.js';
import ToolClear from './clear.js';

function toolClearInit(board) {
  const tool = new ToolClear(board);
  const clearButton = new CustomButton({
    text: 'Clear',
    icon: 'restart_alt',
    transparent: true,
    disabled: true,
  });
  const plate = new Plate({
    cls: ['plate_clear', 'top', 'right'],
  });

  plate.addElement(clearButton, 'clearButton');

  function toggleButton() {
    const cellCount = board.cellCount;
    const isDisabled = clearButton.options.disabled;

    clearButton.setDisabled(!(cellCount > 0 && isDisabled));
  }

  board.emitter.on('onClear', toggleButton);
  board.emitter.on('onErase', toggleButton);
  board.emitter.on('onBrush', toggleButton);
  board.emitter.on('onFill', toggleButton);

  tool.emitter.on('onClear', toggleButton);

  clearButton.emitter.on('handleClick', () => tool.clear());

  return { tool, button: plate };
}

export default toolClearInit;
