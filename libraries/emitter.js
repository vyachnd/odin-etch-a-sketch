class Emitter {
  constructor() {
    this.listeners = new Map();
  }

  on(name, callback) {
    if (!this.listeners.has(name)) this.listeners.set(name, []);

    this.listeners.get(name).push(callback);

    return () => this.off(name, callback);
  }

  off(name, callback) {
    if (!this.listeners.has(name)) return;

    this.listeners.get(name).splice(this.listeners.get(name).indexOf(callback), 1);
  }

  fire(name, ...args) {
    if (!this.listeners.has(name)) return;

    this.listeners.get(name).forEach((callback) => callback(...args));
  }
}

export default Emitter;
