import DragEntity from './drag-entity.js';
import DragLogic from './drag-logic.js';
import DragRender from './drag-render.js';

function ToolDrag(options = {}) {
  const entity = new DragEntity(options.entity);
  const render = new DragRender(entity, options.render);
  const logic = new DragLogic(entity, render, options.logic);

  return { entity, render, logic };
}

export default ToolDrag;
