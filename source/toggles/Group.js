const _Toggle = require('./_Toggle');

module.exports = class Group extends _Toggle {
  constructor(...toggles) {
    super();
    this.toggles = toggles;
  }
  add(toggle) {
    this.toggles.push(toggle);
    return this;
  }
  on() {
    super.on();
    for (let toggle of this.toggles) {
      toggle.on();
    }
    return this;
  }
  off() {
    super.off();
    for (let toggle of this.toggles) {
      toggle.off();
    }
    return this;
  }
}
