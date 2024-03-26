import debounce from '../../../libraries/debounce.js';
import Emitter from '../../../libraries/emitter.js';
import CustomButton from '../button/button.js';
import CustomIcon from '../icon/icon.js';

class CustomInput {
  constructor(options) {
    this.options = {
      id: null,
      value: null,
      placeholder: null,
      rounded: false,
      leftElement: null,
      rightElement: null,
      cls: ['custom-input'],
      ...options,
    };
    this.parent = null;
    this.elements = new Map();
    this.emitter = new Emitter();

    this.updateDebounce = debounce(this.update.bind(this), 100);

    this.setValue = this.setValue.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  #createLeftRightElement(elementPosition, params) {
    const input = this.elements.get('input');
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
  set value(value) { this.setValue(value); }

  get leftElement() { return this.elements.get('leftElement'); }
  get rightElement() { return this.elements.get('rightElement'); }

  handleInput(event) { this.emitter.fire('handleInput', event); }

  setValue(value) {
    this.options.value = value;
    this.updateDebounce();
  }

  setRounded(rounded) {
    this.options.rounded = rounded;
    this.updateDebounce();
  }

  setLeftElement(element) {
    this.options.leftElement = element;
    this.updateDebounce();
  }

  setRightElement(element) {
    this.options.rightElement = element;
    this.updateDebounce();
  }

  update() {
    const input = this.elements.get('input');
    const inputField = this.elements.get('inputField');
    const leftElement = this.elements.get('leftElement');
    const rightElement = this.elements.get('rightElement');

    if (!input) return null;

    if (input.classList.length > 0) input.className = '';
    input.classList.add(...this.options.cls);

    if (this.options.id && inputField.id !== this.options.id) inputField.id = this.options.id;
    if (!this.options.id) delete inputField.id;

    inputField.value = this.options.value || '';
    inputField.placeholder = this.options.placeholder || '';

    // Rounded
    if (this.options.rounded) {
      input.dataset.rounded = '';
    } else {
      delete input.dataset.rounded;
    }

    // Create Left/Right Elements
    this.#createLeftRightElement('leftElement', this.options.leftElement);
    this.#createLeftRightElement('rightElement', this.options.rightElement);

    /*
        // Left Element
        if (!this.options.leftElement) {
          if (leftElement) leftElement.destroy();
          this.elements.delete('leftElement');
        } else {
          if (this.options.leftElement !== leftElement) {
            if (leftElement) leftElement.destroy();
    
            this.options.leftElement.options.cls.push('custom-input__left-element');
            this.options.leftElement.render(input);
            input.prepend(this.options.leftElement.target);
            this.elements.set('leftElement', this.options.leftElement);
          }
        }
    
        // Right Element
        if (!this.options.rightElement) {
          if (rightElement) rightElement.destroy();
          this.elements.delete('rightElement');
        } else {
          if (this.options.rightElement !== rightElement) {
            if (rightElement) rightElement.destroy();
    
            this.options.rightElement.options.cls.push('custom-input__right-element');
            this.options.rightElement.render(input);
            input.append(this.options.rightElement.target);
            this.elements.set('rightElement', this.options.rightElement);
          }
        }
    */
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
