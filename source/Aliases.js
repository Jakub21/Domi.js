let $id = (id) => { return document.getElementById(id); }
let $cn = (id) => { return document.getElementsByClassName(id); }
let $tag = (id) => { return document.getElementsByTagName(id); }
let $create = (tag) => { return document.createElement(tag); }
let $on = (elm, key, cb) => { elm.addEventListener(key, cb); }
