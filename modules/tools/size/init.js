import CustomInput from '../../custom-elements/input/input.js';
import ToolSize from './size.js';

function toolSizeInit(board) {
  const tool = new ToolSize(board);
  const input = new CustomInput({
    cls: ['size-tool'],
    value: tool.size.current,
    placeholder: `${tool.size.min} - ${tool.size.max}`,
    border: true,
    rightElement: {
      type: 'button',
      options: {
        icon: 'resize',
        iconOnly: true,
      }
    }
  });

  tool.emitter.on('setSize', () => input.setOptions({ value: tool.size.current }));

  input.emitter.on('handleBlur', () => {
    if (+input.value !== tool.size) input.value = tool.size.current;
  });
  input.emitter.on('handlePaste', (event) => event.preventDefault());

  input.emitter.on('handleSubmit', () => tool.setSize(Number(input.value)));
  input.emitter.on('handleButtonClick', () => tool.setSize(Number(input.value)));

  return { tool, element: input };
}

export default toolSizeInit;
