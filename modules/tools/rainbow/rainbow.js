import RainbowEntity from './rainbow-entity.js';
import RainbowLogic from './rainbow-logic.js';

function ToolRainbow(board, toolColor, options = {}) {
  const entity = new RainbowEntity(board, toolColor, options.entity);
  const logic = new RainbowLogic(entity, options.logic);

  return logic;
}

export default ToolRainbow;
