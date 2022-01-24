
module.exports = class Basic {
  constructor(elm, initial) {
    this.elm = elm;
    this.state = initial? true : false;
  }
  toggle() {
    this.state = !this.state;
  }
  on() {
    this.state = true;
  }
  off() {
    this.state = false;
  }
}
