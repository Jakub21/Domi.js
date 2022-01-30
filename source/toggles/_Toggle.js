
module.exports = class _Toggle {
  constructor(elm) {
    this.elm = elm;
    this.state = !elm.hidden;
  }
  toggle() {
    if (this.state) this.off();
    else this.on();
    return this;
  }
  on() {
    this.state = true;
    return this;
  }
  off() {
    this.state = false;
    return this;
  }
}
