
class Keyboard {
  constructor(element) {
    this.element = element;
  }
  bind(keys, callback) {
    if (keys.constructor != Array) keys = [keys];
    $on(this.element, 'keydown', (evt) => {
      if (keys.includes(evt.key)) callback(evt);
    });
  }
  bindIns(keys, callback) {
    if (keys.constructor != Array) keys = [keys];
    for (let key of keys) {
      let keyU = key.toUpperCase();
      if (keyU != key) keys.push(keyU);
      let keyL = key.toLowerCase();
      if (keyL != key) keys.push(keyL);
    }
    this.bind(keys, callback);
  }
}
