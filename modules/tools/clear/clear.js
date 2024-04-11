import ClearEntity from './clear-entity.js';
import ClearLogic from './clear-logic.js';

function ToolClear(board, options = {}) {
  const entity = new ClearEntity(board, options.entity);
  const logic = new ClearLogic(entity, options.logic);

  return logic;
}

export default ToolClear;
