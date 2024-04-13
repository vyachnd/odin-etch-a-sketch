import debounce from '../../../libraries/debounce.js';
import Emitter from '../../../libraries/emitter.js';
import CustomButton from '../button/button.js';
import CustomIcon from '../icon/icon.js';

class CustomInput {
  constructor(options) {
    this.options = {
      id: null,
      cls: [],
      value: null,
      placeholder: null,
      variant: null,
      darkened: false,
      border: false,
      rounded: false,
      disabled: false,
      leftElement: null,
      rightElement: null,
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.handleInput = this.handleInput.bind(this);
  }

  #createLeftRightElement(elementPosition, params) {
    const input = this.elements.get('input');
    const inputField = this.elements.get('inputField');
    const element = this.elements.get(elementPosition);

    const updateElement = () => {
      element.options = {
        ...element.options,
        ...params.options,
      };
      element.update();
    };

    if (!params && element) {
      if (element) element.destroy();
      this.elements.delete(elementPosition);
    } else if (params) {
      if (
        element instanceof CustomIcon && params.type === 'icon'
        || element instanceof CustomButton && params.type === 'button'
      ) {
        updateElement();
      } else {
        if (element) element.destroy();

        let newElement;

        if (params.type === 'icon') newElement = new CustomIcon(params.options);
        if (params.type === 'button') {
          if (this.options.rounded) params.options.rounded = true;
          newElement = new CustomButton(params.options);

          newElement.emitter.on('handleClick', () => {
            const buttonId = elementPosition === 'leftElement' ? 0 : 1;

            newElement.target.blur();
            this.emitter.fire(`handleButtonClick`, buttonId);
          });
        }

        if (elementPosition === 'leftElement') newElement.options.cls.push('custom-input__left-element');
        if (elementPosition === 'rightElement') newElement.options.cls.push('custom-input__left-element');

        newElement.render(input);
        if (elementPosition === 'leftElement') input.prepend(newElement.target);
        if (elementPosition === 'rightElement') input.append(newElement.target);

        this.elements.set(elementPosition, newElement);
      }
    }
  }

  get target() { return this.elements.get('input'); }
  get value() { return this.target.value; }
  set value(value) { this.setOptions({ value }); }

  get leftElement() { return this.elements.get('leftElement'); }
  get rightElement() { return this.elements.get('rightElement'); }

  setOptions(options) {
    for (const option in options) {
      if (this.options.hasOwnProperty(option)) {
        this.options[option] = options[option];

        this.update();

        this.emitter.fire('setOptions', { type: option, value: options[option] });
      }
    }
  }

  handleInput(event) { this.emitter.fire('handleInput', event); }

  update() {
    const input = this.elements.get('input');
    const inputField = this.elements.get('inputField');

    if (!input) return null;

    // ID
    if (this.options.id) {
      inputField.id = this.options.id;
    } else {
      delete inputField.id;
    }

    // Class
    if (input.classList.length > 0) input.className = '';
    input.classList.add('custom-input', ...this.options.cls);

    // Value
    inputField.value = this.options.value || '';

    // Placeholder
    inputField.placeholder = this.options.placeholder || '';

    // Variant
    if (this.options.variant) {
      input.dataset.variant = this.options.variant;
    } else {
      delete input.dataset.variant;
    }

    // Darkened
    if (this.options.darkened) {
      input.dataset.darkened = '';
    } else {
      delete input.dataset.darkened;
    }

    // Border
    if (this.options.border) {
      input.dataset.border = '';
    } else {
      delete input.dataset.border;
    }

    // Rounded
    if (this.options.rounded) {
      input.dataset.rounded = '';
    } else {
      delete input.dataset.rounded;
    }

    // Disabled
    if (this.options.disabled) {
      input.dataset.disabled = '';
      inputField.disabled = true;
    } else {
      delete input.dataset.disabled;
      inputField.disabled = false;
    }

    // Create Left/Right Elements
    this.#createLeftRightElement('leftElement', this.options.leftElement);
    this.#createLeftRightElement('rightElement', this.options.rightElement);
  }

  destroy() {
    const input = this.elements.get('input');

    if (input) input.remove();

    this.elements.clear();
  }

  render(parent) {
    if (!parent) return null;

    let input = this.elements.get('input');

    if (!input) {
      input = document.createElement('div');
      input.tabindex = -1;
      this.elements.set('input', input);

      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.classList.add('custom-input__field');
      this.elements.set('inputField', inputField);

      Object.defineProperty(input, 'value', {
        get: () => inputField.value,
        set: (value) => this.setValue(value),
      });

      inputField.addEventListener('input', this.handleInput.bind(this));

      input.append(inputField);
    }

    this.update();

    this.parent = parent;
    this.parent.append(input);
  }
}

export default CustomInput;
