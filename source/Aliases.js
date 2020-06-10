var $id = (id) => { return document.getElementById(id); }
var $cn = (id) => { return document.getElementsByClassName(id); }
var $tag = (id) => { return document.getElementsByTagName(id); }
var $create = (tag) => { return document.createElement(tag); }
var $on = (elm, key, cb) => { elm.addEventListener(key, cb); }
