import DragEntity from './drag-entity.js';
import DragLogic from './drag-logic.js';

function ToolDrag(camera, options = {}) {
  const entity = new DragEntity(camera, options.entity);
  const logic = new DragLogic(entity, options.logic);

  return logic;
}

export default ToolDrag;
