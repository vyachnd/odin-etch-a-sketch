import BoardEntity from './board-entity.js';
import BoardLogic from './board-logic.js';
import BoardRender from './board-render.js';

function Board(options = {}) {
  const entity = new BoardEntity(options.entity);
  const render = new BoardRender(entity, options.render);
  const logic = new BoardLogic(entity, render, options.logic);

  return { entity, render, logic };
}

export default Board;
