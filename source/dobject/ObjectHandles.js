
module.exports = class ObjectHandles {
  on(evtKey, cb, ...opts) {
    if (evtKey.constructor == Array) {
      for (let k of evtKey) this.elm.addEventListener(k, cb, ...opts);
    } else {
      this.elm.addEventListener(evtKey, cb, ...opts);
    }
    return this;
  }
  onk(evtKey, kb, kbKey, cb, ...opts) {
    this.on(evtKey, cb, ...opts);
    kb.bind(kbKey, cb);
    return this;
  }
  onkIns(evtKey, kb, kbKey, cb, ...opts) {
    this.on(evtKey, cb, ...opts);
    kb.bindIns(kbKey, cb);
    return this;
  }
}
