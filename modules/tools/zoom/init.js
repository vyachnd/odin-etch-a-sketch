import CustomButton from '../../custom-elements/button/button.js';
import Plate from '../../plate.js';
import ToolZoom from './zoom.js';

function toolZoomInit(camera) {
  const tool = new ToolZoom(camera);
  const zoomOutBtn = new CustomButton({
    icon: 'zoom_out',
    iconOnly: true,
    transparent: true,
    disabled: true,
  });
  const zoomResetBtn = new CustomButton({
    text: '100%',
    transparent: true,
  });
  const zoomInBtn = new CustomButton({
    icon: 'zoom_in',
    iconOnly: true,
    transparent: true,
    disabled: true,
  });
  const plate = new Plate({
    cls: ['plate_zoom', 'flex', 'bottom', 'center'],
  });

  plate.addElement(zoomOutBtn, 'zoomOut');
  plate.addElement(zoomResetBtn, 'zoomResetBtn');
  plate.addElement(zoomInBtn, 'zoomInBtn');

  function toggleButtons() {
    const { min, max, current } = camera.zoom;

    zoomOutBtn.setDisabled(current <= min);
    zoomInBtn.setDisabled(current >= max);

    zoomResetBtn.setText(`${Math.round(current * 100)}%`);
  }

  camera.emitter.on('setZoom', toggleButtons);
  camera.emitter.on('setZoomable', toggleButtons);
  camera.emitter.on('onZoomIn', toggleButtons);
  camera.emitter.on('onZoomOut', toggleButtons);
  camera.emitter.on('onZoomReset', toggleButtons);

  zoomOutBtn.emitter.on('handleClick', () => camera.zoomOut());
  zoomResetBtn.emitter.on('handleClick', () => camera.zoomReset());
  zoomInBtn.emitter.on('handleClick', () => camera.zoomIn());

  toggleButtons();

  return { tool, button: plate };
}

export default toolZoomInit;
