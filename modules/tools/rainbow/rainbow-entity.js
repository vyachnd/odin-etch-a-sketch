import Emitter from '../../../libraries/emitter.js';
import { minmax, randomRange } from '../../../libraries/helpers.js';

const rainbowColors = [
  { r: 255, g: 0, b: 0 },     // Красный
  { r: 255, g: 165, b: 0 },   // Оранжевый
  { r: 255, g: 255, b: 0 },   // Желтый
  { r: 0, g: 128, b: 0 },     // Зеленый
  { r: 66, g: 170, b: 255 },  // Голубой
  { r: 0, g: 0, b: 255 },     // Синий
  { r: 139, g: 0, b: 255 },   // Фиолетовый
];

class RainbowEntity {
  constructor(board, toolColor) {
    this.board = board;
    this.toolColor = toolColor;
    this.generator = this.#rainbowGenerator();
    this.prevPos = null;
    this.enabled = false;
    this.emitter = new Emitter();
  }

  * #rainbowGenerator() {
    let currentIndex = 0;

    function getNext() {
      const color = Object.assign({}, rainbowColors[currentIndex]);
      const variation = 100;

      Object.keys(color).map((key) => {
        const component = color[key];

        color[key] = minmax(component + Math.floor(randomRange(-variation, variation)), 0, 255);
      });

      currentIndex = (currentIndex + 1) % rainbowColors.length;

      return color;
    }

    for (let i = 0; i < rainbowColors.length; i += 1) { yield getNext(); }
  }

  #resetGenerator() { this.generator = this.#rainbowGenerator(); }

  enable() {
    this.enabled = true;
    this.emitter.fire('enable');
  }
  disable() {
    this.enabled = false;
    this.emitter.fire('disable');
  }

  onReset() {
    this.#resetGenerator();
  }

  onChangeColor() {
    let result = this.generator.next();

    if (result.done) {
      this.onReset();
      result = this.generator.next();
    }

    this.toolColor.change(result.value);
  }
}

export default RainbowEntity;
