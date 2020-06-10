# Domi.js package
Set of functions and classes to make work with the DOM more pleasant.

There are so many popular packages out there that solve exactly the same problems
but I couldn't find anything that would fit me.
Most of them require time invested in learning or taken by searches.
So there it is, simple DOM wrapper with no more than 2 pages of docs.

## Getting the package
You can download latest stable version from github relases tab.

Alternatively you can clone whole repository and link all files from `/source`
in your project.

You can also build shrinked 1-file version yourself, using `build.py` script.
(Yes, there are better ways to generate code files)

## Using package classes

### `Keyboard`
```javascript
new Keyboard(domElement);
```
Handles `keydown` DOM events. Normally you have to check if the `event.key`
matches the key. This wrapper class takes care of this.
Bindings are added with `bind(key, callback)`.


### `Switcher`
```javascript
new Switcher();
```
This class is intended for single-page applications and helps with switching
currently visible sections. Use `goto(domElementID)` method to switch section.
To switch to previously visible section, use `back()`. Sections are added with
`addSection(section)`, where `section` is instance of `Section` class.

Switchers also allow you to make menu that is only available in some sections.
Menu must be first wrapped in `DomStateToggle`. Menu toggle can be then assigned
to the switcher with `addMenuToggle(menuToggle)` method.


### `Section`
```javascript
new Section(domElementID, menuVisible=false, onEnterCb=null, onLeaveCb=null);
```
Section class is intended to be used with the switcher.

Because of package design, methods of this class would throw errors, if called
on instance that was not assigned to the switcher (with `switcher.addSection(section)`).


### `DomStateToggle`
```javascript
new DomStateToggle(domElement, startingState, cssClassOn=null, cssClassOff=null, hiddenWhenOff=false);
```
Toggles allow you to control DOM elements that have two states they can be in.
You can toggle the state with `toggle()` method. Also, you can turn toggle `on()`
and `off()`. Additionally, toggles can be disabled (controlled by
`enable()` and `disable()` methods). Toggles in this state ignore method calls
that would change the state.

You can also bind the `toggle()` method to keyboard key with
`bind(keyboard, key)` method, where `keyboard` is instance of `Keyboard` class.


## Package aliases
The package also comes with some globally available aliases that make your code
easier to read and maintain.
- `$id = (id) => { return document.getElementById(id); }`
- `$cn = (id) => { return document.getElementsByClassName(id); }`
- `$tag = (id) => { return document.getElementsByTagName(id); }`
- `$create = (tag) => { return document.createElement(tag); }`
- `$on = (elm, key, cb) => { elm.addEventListener(key, cb); }`
