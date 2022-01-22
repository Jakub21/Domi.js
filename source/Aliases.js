
let $create = (data) => {
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
  return elm;
}

let $prop = (elm, config={}) => {
  for (let [key, val] of Object.entries(config)) {
    elm[key] = val;
  }
  return elm;
}

let $$ = (selector, parent) => {
  let source = parent || document;
  return source.querySelectorAll(selector);
}

let $ = (selector, parent) => {
  let result = $$(selector, parent);
  try { return result[0]; }
  catch (err) { return result };
}

let $on = (elm, evtKey, cb) => {
  if (evtKey.constructor == Array) {
    for (let k of evtKey) elm.addEventListener(k, cb);
  } else {
    elm.addEventListener(evtKey, cb);
  }
  return elm;
}

let $onk = (elm, evtKey, kb, kbKey, cb) => {
  $on(elm, evtKey, cb);
  kb.bind(kbKey, cb);
  return elm;
}

let $onkIns = (elm, evtKey, kb, kbKey, cb) => {
  $on(elm, evtKey, cb);
  kb.bindIns(kbKey, cb);
  return elm;
}

let $remove = (elm) => {
  elm.parentNode.removeChild(elm);
};

let $empty = (elm) => {
  if (elm.lastChild === undefined) return;
  while (elm.lastChild) { elm.removeChild(elm.lastChild); }
  return elm;
}
