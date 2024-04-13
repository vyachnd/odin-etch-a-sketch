import SizeEntity from './size-entity.js';
import SizeLogic from './size-logic.js';

function ToolSize(board, options = {}) {
  const entity = new SizeEntity(board, options.entity);
  const logic = new SizeLogic(entity, options.logic);

  return logic;
}

export default ToolSize;
