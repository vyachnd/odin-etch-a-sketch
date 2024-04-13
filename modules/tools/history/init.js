import CustomButton from '../../custom-elements/button/button.js';
import Plate from '../../plate.js';
import ToolHistory from './history.js';

function toolHistoryInit(board) {
  const tool = new ToolHistory(board);
  const historyUndo = new CustomButton({
    icon: 'undo',
    iconOnly: true,
    transparent: true,
    disabled: true,
  });
  const historyRedo = new CustomButton({
    icon: 'redo',
    iconOnly: true,
    transparent: true,
    disabled: true,
  });
  const plate = new Plate({
    cls: ['plate_history', 'flex', 'bottom', 'left'],
  });

  plate.addElement(historyUndo, 'historyUndo');
  plate.addElement(historyRedo, 'historyRedo');

  function toggleButtons() {
    const { history, index } = tool;

    historyUndo.setOptions({ disabled: !(history.length > 0 && index > 0) });
    historyRedo.setOptions({ disabled: !(history.length > 0 && index < history.length) });
  }

  tool.emitter.on('onChange', toggleButtons);
  tool.emitter.on('undo', toggleButtons);
  tool.emitter.on('redo', toggleButtons);

  historyUndo.emitter.on('handleClick', () => tool.undo());
  historyRedo.emitter.on('handleClick', () => tool.redo());

  return { tool, element: plate };
}

export default toolHistoryInit;
