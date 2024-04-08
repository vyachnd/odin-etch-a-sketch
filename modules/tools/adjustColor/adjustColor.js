import AdjustColorEntity from './adjustColor-entity.js';
import AdjustColorLogic from './adjustColor-logic.js';

function ToolAdjustColor(board, options = {}) {
  const entity = new AdjustColorEntity(board, options.entity);
  const logic = new AdjustColorLogic(entity, options.logic);

  return logic;
}

export default ToolAdjustColor;
