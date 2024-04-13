import CenterEntity from './center-entity.js';
import CenterLogic from './center-logic.js';

function ToolCenter(camera, board, options = {}) {
  const entity = new CenterEntity(camera, board, options.entity);
  const logic = new CenterLogic(entity, options.logic);

  return logic;
}

export default ToolCenter;
