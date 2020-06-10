
// NOTE: This might have to be expanded but is enough for now
class Keyboard {
  constructor(element) {
    this.element = element;
  }
  bind(key, callback) {
    $on(this.element, 'keydown', (evt) => {
      if (evt.key == key) callback(evt);
    });
  }
}
