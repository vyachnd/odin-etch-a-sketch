import GridEntity from './grid-entity.js';
import GridLogic from './grid-logic.js';
import GridRender from './grid-render.js';

function ToolGrid(board, options = {}) {
  const entity = new GridEntity(board, options.entity);
  const render = new GridRender(entity, options.render);
  const logic = new GridLogic(entity, render, options.logic);

  return logic;
}

export default ToolGrid;
