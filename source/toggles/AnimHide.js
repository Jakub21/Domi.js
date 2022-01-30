const _Toggle = require('./_Toggle');

module.exports = class AnimHide extends _Toggle {
  constructor(elm, onClass, offClass, delay) {
    super(elm);
    this.onClass = onClass;
    this.offClass = offClass;
    this.delay = delay * 1e3;
  }
  on() {
    super.on();
    setTimeout(() => {
      this.elm._s.choice(this.onClass, [this.onClass, this.offClass]);
    }, this.delay);
    this.elm.prop({hidden:false});
  }
  off() {
    super.off();
    this.elm._s.choice(this.offClass, [this.onClass, this.offClass]);
    setTimeout(() => { this.elm.prop({hidden:true}); }, this.delay);
  }
}
