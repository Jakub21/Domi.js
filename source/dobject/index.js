const DomiObject = require('./DomiObject');
module.exports.DomiObject = DomiObject;

module.exports.make = (data) => {
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

module.exports.get = (selector, parent) => {
  parent = parent || document;
  return new DomiObject(parent.querySelector(selector));
}

module.exports.getArr = (selector, parent) => {
  parent = parent || document;
  let elms = Array.from(parent.querySelectorAll(selector));
  return elms.map(e => {return new DomiObject(e);});
}
