import Emitter from '../../../libraries/emitter.js';
import CustomIcon from '../icon/icon.js';

class CustomButton {
  constructor(parent, options) {
    this.parent = parent || null;
    this.options = {
      id: null,
      text: 'Button',
      icon: null,
      iconSecondary: null,
      size: null,
      variant: null,
      transparent: false,
      fill: true,
      align: null,
      iconOnly: false,
      active: false,
      disabled: false,
      cls: [],
      ...options,
    };
    this.elements = new Map();
    this.emitter = new Emitter();

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDblClick = this.handleDblClick.bind(this);
  }

  get target() { return this.elements.get('button'); }

  handleClick(event) { this.emitter.fire('handleClick', event); }
  handleMouseDown(event) { this.emitter.fire('handleMouseDown', event); }
  handleMouseUp(event) { this.emitter.fire('handleMouseUp', event); }
  handleDblClick(event) { this.emitter.fire('handleDblClick', event); }

  setText(text) {
    this.options.text = text;
    this.update();
  }

  setIcon(icon) {
    this.options.icon = icon;
    this.update();
  }

  setIconSecondary(icon) {
    this.options.iconSecondary = icon;
    this.update();
  }

  setSize(size) {
    this.options.size = size;
    this.update();
  }

  setVariant(variant) {
    this.options.variant = variant;
    this.update();
  }

  setTransparent(transparent) {
    this.options.transparent = transparent;
    this.update();
  }

  setFill(fill) {
    this.options.fill = fill;
    this.update();
  }

  setAlign(align) {
    this.options.align = align;
    this.update();
  }

  setIconOnly(iconOnly) {
    this.options.iconOnly = iconOnly;
    this.update();
  }

  setActive(active) {
    this.options.active = active;
    this.update();
  }

  setDisabled(disabled) {
    this.options.disabled = disabled;
    this.update();
  }

  update() {
    const button = this.elements.get('button');

    if (!button) return null;

    const icon = this.elements.get('icon');
    const buttonText = this.elements.get('buttonText');
    const iconSecondary = this.elements.get('iconSecondary');

    if (this.options.id) button.id = this.options.id;
    if (button.classList.length > 0) button.className = '';
    button.classList.add('button', ...this.options.cls);

    // Size
    if (this.options.size) {
      button.dataset.size = this.options.size;
    } else {
      delete button.dataset.size;
    }

    // Text
    if (this.options.text) {
      buttonText.textContent = this.options.text;

      if (icon.target) {
        icon.target.insertAdjacentElement('afterend', buttonText);
      } else {
        button.prepend(buttonText);
      }
    } else {
      buttonText.remove();
    }

    // Icon
    if (this.options.icon) {
      icon.setIcon(this.options.icon);
      icon.render(button);
      button.prepend(icon.target);
    } else {
      icon.destroy();
    }

    // Secondary Icon
    if (this.options.iconSecondary) {
      iconSecondary.setIcon(this.options.iconSecondary);
      iconSecondary.render(button);
    } else {
      iconSecondary.destroy();
    }

    // Variant
    if (this.options.variant) {
      button.dataset.variant = this.options.variant;
    } else {
      delete button.dataset.variant;
    }

    // Transparent
    if (this.options.transparent && this.options.fill) {
      button.dataset.transparent = '';
    } else {
      delete button.dataset.transparent;
    }

    // Fill
    if (this.options.fill) {
      button.dataset.fill = '';
    } else {
      delete button.dataset.fill;
    }

    // Align
    if (this.options.align) {
      button.dataset.align = this.options.align;
    } else {
      delete button.dataset.align;
    }

    // Icon Only
    if (this.options.iconOnly) {
      button.dataset.iconOnly = '';
      if (this.options.iconSecondary) iconSecondary.destroy();
      if (this.options.text) buttonText.remove();
    } else {
      delete button.dataset.iconOnly;
    }

    // Active
    if (this.options.active) {
      button.dataset.active = '';
    } else {
      delete button.dataset.active;
    }

    // Disabled
    if (this.options.disabled) {
      button.dataset.disabled = '';
    } else {
      delete button.dataset.disabled;
    }
    button.disabled = this.options.disabled;
  }

  destroy() {
    const button = this.elements.get('button');

    if (button) button.remove();

    this.elements.clear();
  }

  render() {
    if (!this.parent) return null;

    let button = this.elements.get('button');

    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      this.elements.set('button', button);

      const buttonText = document.createElement('span');
      buttonText.classList.add('button__text');
      this.elements.set('buttonText', buttonText);

      const icon = new CustomIcon(button, {
        type: 'rounded',
        fill: true,
        icon: this.options.icon,
        cls: ['button__icon', 'button__icon-left'],
      });
      this.elements.set('icon', icon);

      const iconSecondary = new CustomIcon(button, {
        type: 'rounded',
        fill: true,
        icon: this.options.iconSecondary,
        cls: ['button__icon', 'button__icon-left'],
      });
      this.elements.set('iconSecondary', iconSecondary);

      this.parent.append(button);
    }

    button.addEventListener('click', this.handleClick);
    button.addEventListener('mousedown', this.handleMouseDown);
    button.addEventListener('mouseup', this.handleMouseUp);
    button.addEventListener('dblclick', this.handleDblClick);

    this.update();
  }
}

export default CustomButton;
