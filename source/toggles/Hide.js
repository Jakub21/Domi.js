const _Toggle = require('./_Toggle');

module.exports = class Hide extends _Toggle {
  constructor(elm) {
    super(elm);
    this.state = !elm.hidden;
  }
  on() {
    super.on();
    this.elm.prop({hidden:false});
    return this;
  }
  off() {
    super.off();
    this.elm.prop({hidden:true});
    return this;
  }
}
