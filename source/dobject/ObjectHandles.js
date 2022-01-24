
module.exports = class ObjectHandles {
  on(evtKey, cb) {
    if (evtKey.constructor == Array) {
      for (let k of evtKey) this.elm.addEventListener(k, cb);
    } else {
      this.elm.addEventListener(evtKey, cb);
    }
    return this;
  }
  onk(evtKey, kb, kbKey, cb) {
    $on(evtKey, cb);
    kb.bind(kbKey, cb);
    return this;
  }
  onkIns(evtKey, kb, kbKey, cb) {
    $on(evtKey, cb);
    kb.bindIns(kbKey, cb);
    return this;
  }
}
