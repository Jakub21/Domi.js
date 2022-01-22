
class DomiObject extends ShpMethods {
  constructor(elm) {
    super();
    this.elm = elm
  }
  prop(config={}) {
    for (let [key, val] of Object.entries(config)) {
      this.elm[key] = val;
    }
    return this;
  }
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
  remove() {
    this.elm.parentNode.removeChild(this.elm);
    return this;
  }
  empty() {
    if (this.elm.lastChild === undefined) return;
    while (this.elm.lastChild) { this.elm.removeChild(this.elm.lastChild); }
    return this.elm;
  }
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

let $make = (data) => {
  let words = data.split(' ');
  let elm = document.createElement(words[0]);
  for (let token of words.slice(1)) {
    let type = token.charAt(0);
    let name = token.slice(1);
    switch (type) {
      case '#':
        elm.id = name; break;
      case '.':
        elm.classList.add(name); break;
      case '!':
        elm[name] = true; break;
      default:
        throw 'Invalid token';
    }
  }
  return new DomiObject(elm);
}

let $get = (selector, parent) => {
  parent = parent || document;
  return new DomiObject(parent.querySelector(selector));
}

let $getArr = (selector, parent) => {
  parent = parent || document;
  let elms = Array.from(parent.querySelectorAll(selector));
  return elms.map(e => {return new DomiObject(e);});
}
