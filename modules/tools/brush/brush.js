import ThumbEntity from './brush-entity.js';
import ThumbLogic from './brush-logic.js';
import ThumbRender from './brush-render.js';

function ToolThumb(board, options = {}) {
  const entity = new ThumbEntity(board, options.entity);
  const render = new ThumbRender(entity, options.render);
  const logic = new ThumbLogic(entity, render, options.logic);

  return logic;
}

export default ToolThumb;
