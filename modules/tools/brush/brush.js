import BrushEntity from './brush-entity.js';
import BrushLogic from './brush-logic.js';

function ToolBrush(board, toolColor, options = {}) {
  const entity = new BrushEntity(board, toolColor, options.entity);
  const logic = new BrushLogic(entity, options.logic);

  return logic;
}

export default ToolBrush;
