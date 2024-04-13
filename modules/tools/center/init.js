import CustomButton from '../../custom-elements/button/button.js';
import ToolCenter from './center.js';

function toolCenterInit(camera, board) {
  const tool = new ToolCenter(camera, board);
  const centerBtn = new CustomButton({
    cls: ['center-tool', 'bottom', 'center'],
    text: 'TO CENTER',
    size: 'sm',
    variant: 'secondary',
    transparent: true,
  });

  function toggleButton(distance = 0) {
    if (distance < 100) {
      centerBtn.setOptions({
        transparent: true,
        disabled: true,
      });
    } else {
      centerBtn.setOptions({
        transparent: false,
        disabled: false,
      });
    }
  }

  tool.emitter.on('onCenter', toggleButton);
  tool.emitter.on('onMove', toggleButton);

  centerBtn.emitter.on('handleClick', () => tool.center());

  toggleButton();

  return { tool, element: centerBtn };
}

export default toolCenterInit;
