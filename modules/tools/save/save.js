import SaveEntity from './save-entity.js';
import SaveLogic from './save-logic.js';

function ToolSave(board, options = {}) {
  const entity = new SaveEntity(board, options.entity);
  const logic = new SaveLogic(entity, options.logic);

  return logic;
}

export default ToolSave;
