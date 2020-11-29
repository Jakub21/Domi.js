
let $id = (id, from=undefined) => {
  if (from != undefined)
    return from.querySelector(`#${id}`);
  return document.getElementById(id);
}
let $cn = (cn, from=undefined) => {
  if (from != undefined)
    return from.querySelectorAll(`.${cn}`);
  return document.getElementsByClassName(cn);
}
let $tag = (tag, from=undefined) => {
  if (from != undefined)
    return from.querySelectorAll(tag);
  return document.getElementsByTagName(tag);
}
let $qr = (query, from=undefined) => {
  if (from == undefined)
    from = document;
  return from.querySelector(query);
}

let $remove = (elm) => {
  elm.parentNode.removeChild(elm);
};

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
let $on = (elm, key, cb) => {
  elm.addEventListener(key, cb);
}
let $empty = (elm) => {
  while (elm.lastChild) { elm.removeChild(elm.lastChild); }
}
