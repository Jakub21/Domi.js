const DomiObject = require('./dobject/DomiObject');

module.exports = class Keyboard {
  constructor(dobj) {
    this.dobj = dobj || new DomiObject(document);
  }
  bind(keys, callback) {
    if (keys.constructor != Array) keys = [keys];
    this.dobj.on('keydown', (evt) => {
      if (keys.includes(evt.key)) callback(evt);
    });
    return this;
  }
  bindIns(keys, callback) {
    if (keys.constructor != Array) keys = [keys];
    for (let key of keys) {
      let keyU = key.toUpperCase();
      if (keyU != key) keys.push(keyU);
      let keyL = key.toLowerCase();
      if (keyL != key) keys.push(keyL);
    }
    this.bind(keys, callback);
    return this;
  }
}
