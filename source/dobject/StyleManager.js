const ObjectHandles = require('./ObjectHandles');

module.exports = class StyleManager {
  constructor(elm) {
    this.elm = elm;
  }
  set(prop, value) {
    this.elm.style[prop] = value;
    return this;
  }
  style(styles) {
    for (let [prop, value] of Object.entries(styles)) {
      this.set(prop, value);
    }
    return this;
  }
  add(cc) {
    this.elm.classList.add(cc);
    return this;
  }
  remove(cc) {
    this.elm.classList.remove(cc);
    return this;
  }
  toggle(cc) {
    this.elm.classList.toggle(cc);
    return this;
  }
  setAdded(cc, state) {
    if (state) this.elm.classList.add(cc);
    else this.elm.classList.remove(cc);
    return this;
  }
  choice(cc, allChoices) {
    for (let other of allChoices) {
      if (other == cc) this.add(other);
      else this.remove(other);
    }
    return this;
  }
  nextChoice(allChoices) {
    let current = Array.from(this.elm.classList);
    current = current.filter(c => {return allChoices.includes(c)});
    if (current.length) current = current[0];
    else current = allChoices[0];
    let next = allChoices.indexOf(current) + 1;
    if (next == allChoices.length) next = 0;
    next = allChoices[next];
    for (let other of allChoices) {
      if (other == next) this.add(other);
      else this.remove(other);
    }
    return this;
  }
}
