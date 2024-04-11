import ZoomEntity from './zoom-entity.js';
import ZoomLogic from './zoom-logic.js';

function ToolZoom(camera, options = {}) {
  const entity = new ZoomEntity(camera, options.entity);
  const logic = new ZoomLogic(entity, options.logic);

  return logic;
}

export default ToolZoom;
