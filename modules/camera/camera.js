import CameraEntity from './camera-entity.js';
import CameraLogic from './camera-logic.js';
import CameraRender from './camera-render.js';

function Camera(options = {}) {
  const entity = new CameraEntity(options.entity);
  const render = new CameraRender(entity, options.render);
  const logic = new CameraLogic(entity, render, options.logic);

  return logic;
}

export default Camera;
