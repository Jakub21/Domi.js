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
    let allKeys = [...keys];
    for (let key of keys) {
      let keyU = key.toUpperCase();
      let keyL = key.toLowerCase();
      if (keyL != key && keyU != key) allKeys.push(key); // named keys, ex. Escape
      else {
        allKeys.push(keyU);
        allKeys.push(keyL);
      }
    }
    this.bind(allKeys, callback);
    return this;
  }
}
