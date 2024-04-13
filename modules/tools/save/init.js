import CustomButton from '../../custom-elements/button/button.js';
import Plate from '../../plate.js';
import ToolZoom from './save.js';

function toolZoomInit(board) {
  const tool = new ToolZoom(board);
  const saveBtn = new CustomButton({
    text: 'Save',
    icon: 'upload',
    transparent: true,
    disabled: true,
  });
  const plate = new Plate({
    cls: ['plate_save', 'flex', 'bottom', 'right'],
  });

  plate.addElement(saveBtn, 'saveBtn');

  function toggleButton() { saveBtn.setOptions({ disabled: board.cellCount <= 0 }); }

  board.emitter.on('onClear', toggleButton);
  board.emitter.on('onErase', toggleButton);
  board.emitter.on('onFill', toggleButton);
  board.emitter.on('onBrush', toggleButton);

  saveBtn.emitter.on('handleClick', () => tool.save());

  toggleButton();

  return { tool, element: plate };
}

export default toolZoomInit;
