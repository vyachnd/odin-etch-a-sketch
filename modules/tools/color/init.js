import { hexToRgba, rgbaToHex } from '../../../libraries/helpers.js';
import CustomButton from '../../custom-elements/button/button.js';
import ToolColor from './color.js';

function toolColorInit(board) {
  const toolColor = new ToolColor(board);
  const toolColorBtn = new CustomButton({
    icon: 'circle',
    iconOnly: true,
    variant: null,
    fill: false,
    cls: ['color-tool__button'],
  });

  function chagneBtnColor(hex) {
    if (!toolColorBtn.target) return;

    toolColorBtn.target.style.color = hex;
  }

  const colorContainer = document.createElement('div');
  const colorSelector = document.createElement('input');

  colorContainer.classList.add('color-tool');
  colorSelector.classList.add('color-tool__input');
  colorSelector.type = 'color';

  colorContainer.append(colorSelector);

  colorContainer.render = (parent) => {
    toolColorBtn.render(colorContainer);
    parent.append(colorContainer);

    chagneBtnColor(rgbaToHex(toolColor.color));
  };

  colorSelector.addEventListener('input', (event) => {
    toolColor.change(hexToRgba(event.target.value));
    chagneBtnColor(event.target.value);
  });

  toolColor.emitter.on('onChange', (rgba) => {
    const hex = rgbaToHex(rgba);

    colorSelector.value = hex.slice(0, 7);
    chagneBtnColor(hex);
  });
  toolColorBtn.emitter.on('handleClick', () => colorSelector.click());

  return { toolColor, toolColorBtn: colorContainer };
}

export default toolColorInit;
