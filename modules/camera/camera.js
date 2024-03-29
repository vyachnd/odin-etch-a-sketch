import CameraEntity from './camera-entity.js';
import CameraLogic from './camera-logic.js';
import CameraRender from './camera-render.js';

function Camera(options = {}) {
  const camera = new CameraEntity(options.camera);
  const render = new CameraRender(camera, options.render);
  const logic = new CameraLogic(camera, render, options.logic);

  return { camera, render, logic };
}

export default Camera;
