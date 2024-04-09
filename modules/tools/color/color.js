import ColorEntity from './color-entity.js';
import ColorLogic from './color-logic.js';

function ToolColor(options = {}) {
  const entity = new ColorEntity(options.entity);
  const logic = new ColorLogic(entity, options.logic);

  return logic;
}

export default ToolColor;
