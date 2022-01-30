const _Toggle = require('./_Toggle');

module.exports = class CssClass extends _Toggle {
  constructor(elm, onClass, offClass) {
    super(elm);
    this.onClass = onClass;
    this.offClass = offClass;
  }
  on() {
    super.on();
    this.elm._s.choice(this.onClass, [this.onClass, this.offClass]);
  }
  off() {
    super.off();
    this.elm._s.choice(this.offClass, [this.onClass, this.offClass]);
  }
}
