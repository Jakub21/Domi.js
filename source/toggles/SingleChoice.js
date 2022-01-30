const Hide = require('./Hide');

module.exports = class SingleChoice {
  constructor(_ToggleClass, ...defaultOptions) {
    this.toggles = {};
    this.onDelay = 0;
    this.defaultOptions = defaultOptions;
    this.current = '';
    this._ToggleClass = _ToggleClass || Hide;
  }
  enableOnDelay(seconds) {
    this.onDelay = seconds;
  }
  add(id, elm, ...options) {
    this.toggles[id] = new this._ToggleClass(elm,
      ...this.defaultOptions, ...options);
  }
  goto(id) {
    if (this.current == id) return;
    if (this.onDelay) this._goto_delay(id);
    else this._goto_instant(id);
    this.current = id;
  }
  _goto_delay(id) {
    for (let [tid, toggle] of Object.entries(this.toggles)) {
      if (tid == id) setTimeout(()=>{toggle.on()}, this.onDelay * 1e3);
      else toggle.off();
    }
  }
  _goto_instant(id) {
    for (let [tid, toggle] of Object.entries(this.toggles)) {
      if (tid == id) toggle.on();
      else toggle.off();
    }
  }
}
