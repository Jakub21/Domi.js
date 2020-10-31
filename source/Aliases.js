let $id = (id) => { return document.getElementById(id); }
let $cn = (cn) => { return document.getElementsByClassName(cn); }
let $tag = (tag) => { return document.getElementsByTagName(tag); }
let $qr = (query) => { return document.querySelector(query); }
let $create = (tag, id=undefined) => {
  let elm = document.createElement(tag);
  if (id != undefined) elm.id = id;
  return elm;
}
let $text = (text, id=undefined) => {
  let elm = document.createTextNode(text);
  if (id != undefined) elm.id = id;
  return elm;
}
let $on = (elm, key, cb) => { elm.addEventListener(key, cb); }
let $empty = (elm) => {
  while (elm.lastChild) { elm.removeChild(elm.lastChild); }
}
