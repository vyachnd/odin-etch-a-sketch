import EraserEntity from './eraser-entity.js';
import EraserLogic from './eraser-logic.js';

function ToolEraser(board, options = {}) {
  const entity = new EraserEntity(board, options.entity);
  const logic = new EraserLogic(entity, options.logic);

  return logic;
}

export default ToolEraser;
