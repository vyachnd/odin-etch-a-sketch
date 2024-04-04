import ThumbEntity from './thumb-entity.js';
import ThumbLogic from './thumb-logic.js';
import ThumbRender from './thumb-render.js';

function ToolThumb(board, options = {}) {
  const entity = new ThumbEntity(board, options.entity);
  const render = new ThumbRender(entity, options.render);
  const logic = new ThumbLogic(entity, render, options.logic);

  return logic;
}

export default ToolThumb;
