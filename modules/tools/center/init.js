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

  tool.emitter.on('onMove', (distance) => {
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
  });

  centerBtn.emitter.on('handleClick', () => tool.center());

  return { tool, element: centerBtn };
}

export default toolCenterInit;
