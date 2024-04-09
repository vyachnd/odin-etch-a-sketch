import { hexToRgba, rgbaToHex } from '../../../libraries/helpers.js';
import CustomButton from '../../custom-elements/button/button.js';
import ToolColor from './color.js';

function toolColorInit(color) {
  const tool = new ToolColor({ entity: { color } });
  const button = new CustomButton({
    icon: 'circle',
    iconOnly: true,
    variant: null,
    fill: false,
    cls: ['color-tool__button'],
  });

  function chagneBtnColor(hex) {
    if (!button.target) return;

    button.target.style.color = hex;
  }

  const colorContainer = document.createElement('div');
  const colorSelector = document.createElement('input');

  colorContainer.classList.add('color-tool');
  colorSelector.classList.add('color-tool__input');
  colorSelector.type = 'color';

  colorContainer.append(colorSelector);

  colorContainer.render = (parent) => {
    button.render(colorContainer);
    parent.append(colorContainer);

    chagneBtnColor(rgbaToHex(tool.color));
  };

  colorSelector.addEventListener('input', (event) => {
    tool.change(hexToRgba(event.target.value));
    chagneBtnColor(event.target.value);
  });

  tool.emitter.on('onChange', (rgba) => {
    const hex = rgbaToHex(rgba);

    colorSelector.value = hex.slice(0, 7);
    chagneBtnColor(hex);
  });
  button.emitter.on('handleClick', () => colorSelector.click());

  return { tool, button: colorContainer };
}

export default toolColorInit;
