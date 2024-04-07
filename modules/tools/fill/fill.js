import FillEntity from './fill-entity.js';
import FillLogic from './fill-logic.js';

function ToolFill(board, toolColor, options = {}) {
  const entity = new FillEntity(board, toolColor, options.entity);
  const logic = new FillLogic(entity, options.logic);

  return logic;
}

export default ToolFill;
