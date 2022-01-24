const ObjectHandles = require('./ObjectHandles');

module.exports = class ObjectInsert extends ObjectHandles {
  append(...others) {
    for (let other of others)
      this.elm.append(other.elm);
    return this;
  }
  prepend(...others) {
    for (let other of others)
      this.elm.prepend(other.elm);
    return this;
  }
  before(...others) {
    for (let other of others)
      this.elm.parentNode.insertBefore(other.elm, this.elm);
    return this;
  }
  after(...others) {
    for (let other of others)
      this.elm.parentNode.insertBefore(other.elm, this.elm.nextSibling);
    return this;
  }
}
