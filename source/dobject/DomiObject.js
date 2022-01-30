const ObjectShpInsert = require('./ObjectShpInsert');
const StyleManager = require('./StyleManager');

module.exports = class DomiObject extends ObjectShpInsert {
  constructor(elm) {
    super();
    this.elm = elm
    this._s = new StyleManager(elm);
  }
  prop(config={}) {
    for (let [key, val] of Object.entries(config)) {
      this.elm[key] = val;
    }
    return this;
  }
  remove() {
    this.elm.parentNode.removeChild(this.elm);
    return this;
  }
  empty() {
    if (this.elm.lastChild === undefined) return;
    while (this.elm.lastChild) { this.elm.removeChild(this.elm.lastChild); }
    return this.elm;
  }
}
