import HistoryEntity from './history-entity.js';
import HistoryLogic from './history-logic.js';

function ToolHistory(board, options = {}) {
  const entity = new HistoryEntity(board, options.entity);
  const logic = new HistoryLogic(entity, options.logic);

  return logic;
}

export default ToolHistory;
