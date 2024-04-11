import CustomButton from '../../custom-elements/button/button.js';
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

  const historyBtnsCotaniner = document.createElement('div');
  historyBtnsCotaniner.classList.add('history-btns-container', 'flex', 'bottom', 'left');

  historyBtnsCotaniner.destroy = () => {
    historyUndo.destroy();
    historyRedo.destroy();
    historyBtnsCotaniner.remove();
  };

  historyBtnsCotaniner.update = () => {
    const { history, index } = tool;

    historyUndo.setDisabled(!(history.length > 0 && index > 0));
    historyRedo.setDisabled(!(history.length > 0 && index < history.length));
  };

  historyBtnsCotaniner.render = (parent) => {
    historyUndo.render(historyBtnsCotaniner);
    historyRedo.render(historyBtnsCotaniner);
    parent.append(historyBtnsCotaniner);
  };

  const updateBind = historyBtnsCotaniner.update.bind(historyBtnsCotaniner);

  tool.emitter.on('onChange', updateBind);
  tool.emitter.on('undo', updateBind);
  tool.emitter.on('redo', updateBind);

  historyUndo.emitter.on('handleClick', () => tool.undo());
  historyRedo.emitter.on('handleClick', () => tool.redo());

  return { tool, button: historyBtnsCotaniner };
}

export default toolHistoryInit;
