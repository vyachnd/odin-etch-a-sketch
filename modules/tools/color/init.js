import { hexToRgba, rgbaToHex } from '../../../libraries/helpers.js';
import CustomButton from '../../custom-elements/button/button.js';
import ToolColor from './color.js';

function changeColor(target, color) { target.style.color = color; }

function toolColorInit(board) {
  const toolColor = new ToolColor(board);
  const toolColorBtn = new CustomButton({
    icon: 'circle',
    iconOnly: true,
    variant: null,
    fill: false,
    cls: ['color-tool__button'],
  });

  const colorContainer = document.createElement('div');
  const colorSelector = document.createElement('input');

  colorContainer.classList.add('color-tool');
  colorSelector.classList.add('color-tool__input');
  colorSelector.type = 'color';

  colorContainer.append(colorSelector);

  colorContainer.render = (parent) => {
    toolColorBtn.render(colorContainer);
    parent.append(colorContainer);

    changeColor(toolColorBtn.target, rgbaToHex(toolColor.color));
  };

  colorSelector.addEventListener('input', (event) => {
    toolColor.change(hexToRgba(event.target.value));
    changeColor(toolColorBtn.target, event.target.value);
  });

  toolColorBtn.emitter.on('handleClick', () => colorSelector.click());

  return { toolColor, toolColorBtn: colorContainer };
}

export default toolColorInit;
