# Domi.js package

Object oriented DOM manipulation package.



# Domi objects

This is the core of the Domi package. Everything in this section is contained in a global object named simply `$`.

## `$.get(query, parent)`
Creates new `DomiObject` from an existing DOM object. By default `parent` is the `document`. Query is passed to the native `querySelector` method.

```javascript
$.get('#Content');
```
returns wrapper of an existing element with ID `Content`.

```javascript
$.get('.fullWidth');
```
returns wrapper of first existing element with class `fullWidth`.

## `$.getArr(query, parent)`
The same as `$.get` but creates an array of `DomiObject`s. Query is passed to the native `querySelectorAll` method.

```javascript
$.getArr('.fullWidth');
```
returns array of wrappers of all existing elements with class `fullWidth`.

## `$.make(makeData)`
Creates new DOM element and its `DomiObject` wrapper. `makeData` is a string with general information about the element. Tag name is required and must be the first word. Object's `id` and `class` can be defined by adding `#` and `.` prefixed words correspondingly. Additionally, bool flags can be set to true by adding their names prefixed by `!`.

```javascript
$.make('div #Content .fullWidth .dark !hidden');
```
Creates a `div` tag with ID `Content`, classes `fullWidth` and `dark` and sets `hidden` property to `true`. The function then returns the element's `DomiObject` wrapper.

## `DomiObject`
Wraps DOM objects, providing chainable manipulation methods.

```javascript
var dobj = new $.DomiObject(domElement);
```

Example of chaining methods
```javascript
$.get('#foo').empty() // find our element with ID 'foo' and remove its content
  .on('click', ()=>{console.log('Click!');}) // Add click event listener
  .append( // Inside #foo, append a child 'div' node with ID `newChild` ...
    $.make('div #newChild').prop({innerText: 'Bar'})) // ... and 'Bar' inner text
```

##### `prop(config)`
Change object properties. `config` is an object where keys are corresponding DOM object property names.
```javascript
dobj.prop({title: 'This element now has a title!'});
```

##### `remove()`
Remove object from the DOM tree.
##### `empty()`
Delete all child nodes.

##### `append(...others)`
Append provided `DomiObject`s after the element's child nodes.
```javascript
var foo = $.get('#foo');
var bar = $.make('div #bar');
dobj.append(foo, bar);
```

##### `prepend(...others)`
Append provided `DomiObject`s before the element's child nodes.
##### `before(...others)`
Insert provided `DomiObject`s before the element.
##### `after(...others)`
Insert provided `DomiObject`s after the element.

##### `on(domEventKey, callback)`
Alias for `addEventListener`. If `domEventKey` is an array, it creates listeners for all entries in it.
```javascript
dobj_1.on('click', myFunc1);
dobj_2.on(['mousemove', 'keydown'], myFunc2);
```

##### `onk(domEventKey, keyboard, keyName, callback)`
Same as `on` but additionally creates case-sensitive keyboard binding. `keyboard` must be an instance of `$.Keyboard`.  `keyName` is checked against `key` property of original DOM event.
```javascript
var kb = new $.Keyboard(document.body);
dobj.onk('click', kb, 'a', myFunc);
```
##### `onkIns(domEventKey, keyboard, keyName, callback)`
Same as `on` but additionally creates case-insensitive keyboard binding.

## `DomiObject` - SHP Methods
For these methods to work you need `shp.js` to be included in your project.

##### `appendShp(shp)`
Compile provided SHP code and append created nodes after the element's child nodes.
```javascript
dobj.appendShp(`
  $button[#Button1 .red] {Click me}
  $button[#Button2 .blue] {No, click me!}
`);
```

##### `prependShp(shp)`
Compile provided SHP code and prepend created nodes before the element's child nodes.
##### `beforeShp(shp)`
Compile provided SHP code and insert created nodes before the element.
##### `afterShp(shp)`
Compile provided SHP code and insert created nodes after the element.

## `StyleManager`

Each `DomiObject` has a `StyleManager` attached as a `_s` property. All its methods are chainable.

```javascript
var sm = dobj._s;
```

##### `set(property, value)`

Adds inline CSS property.

```javascript
sm.set('color', '#F00');
```

##### `style(styles)`

Adds many inline CSS properties. `styles` is an object with style definitions.

```javascript
sm.style({color: '#F00', fontFamily: 'sans-serif'});
```

##### `add(cssClass)`

Adds CSS class to the element.

```javascript
sm.add('fullWidth');
```

##### `remove(cssClass)`

Removes CSS class from the element.

```javascript
sm.remove('fullWidth');
```

##### `toggle(cssClass)`

Toggles CSS class in the element.

```javascript
sm.toggle('fullWidth');
```

##### `choice(cssClass, choices)`

Adds chosen class to the element and removes all other. Chosen class must be in the `choices` array.

```javascript
sm.choice('red', ['red', 'green', 'blue']);
```

##### `nextChoice(choices)`

Finds currently chosen class in the `choices` array, removes it and adds the next one. If the last class was present, it loops around and adds the first one.

```javascript
sm.nextChoice(['red', 'green', 'blue']);
```

# Keyboard

Handles keyboard bindings.

```javascript
var kb = new $.Keyboard(dobj);
```

`dobj` parameter is an instance of `DomiObject`. If it's undefined, bindings are added to the `document` instead.

Some elements do not accept keyboard focus and in result their bindings are never fired. If that's the case with the element you want to bind, try adding tab index property.

```javascript
dobj.prop({tabIndex: 0});
```

Keyboard bindings are automatically added in `onk` and `onkIns` methods of the `DomiObject`. This means that in most cases you might only need to create the `Keyboard` object and pass the instance around. If you, however, want to add keyboard bindings without creating corresponding buttons, you will have to utilize the methods below.

##### `bind(keys, callback)`

Adds `keydown` event listener to the `DomiObject`.  `keys` must be a key identifier (like `key` property of original DOM events). It can also be an array of identifiers.

```javascript
kb.bind('e', func1);
kb.bind(['1', '2', '3'], func2)
```

##### `bindIns(keys, callback)`

It works just like `bind` but additional keys are added so that letter case does not matter. This means that the letter bindings will be fired independently of the state of `Shift` and `CapsLock` keys.

```javascript
// all three calls have the same effect
kb.bind(['E', 'e'], func);
kb.bindIns('E', func);
kb.bindIns('e', func);
```

# Toggles (general)

This set of classes is responsible for dynamically changing element properties. Everything in this section is contained in a global object named `$toggle`.

General toggles switch between `on` and `off` state. The methods below are shared among all general toggles.

##### `on()`

##### `off()`

##### `toggle()`

## `Hide`

```javascript
var tg = new $toggle.Hide(dobj);
```

Shows and hides attached element by changing its `hidden` property.

`on` - visible

`off` -hidden

## `CssClass`

```javascript
var tg = new $toggle.CssClass(dobj, onClass, offClass);
```

Adds different CSS classes to the attached element depending on the state.

`on` - add `onClass` to the element

`off` - add `offClass` to the element

## `AnimHide`

```javascript
var tg = new $toggle.AnimHide(dobj, onClass, offClass, delay);
```

Combination of `Hide` and `CssClass`. Toggling is delayed so that smooth animation can be achieved through CSS property transitions. Delay is expressed in seconds.

`on` - make element visible and, after the delay, add `onClass`.

`off` - add `offClass` and, after the delay, hide the element.

# Toggles (other)

Other, more complex toggles.

## `SingleChoice`

```javascript
var sc = new $toggle.SingleChoice(toggleClass, ...defaultOptions);
```

Manages multiple toggles to that only one is turned on at any time. Can utilize any general toggle. `toggleClass` is a general toggle class (not instance) that will be used. `...defaultOptions` are default parameters passed when individual toggles are created.

##### `add(ID, dobj, ...options)`

Creates toggle with the `dobj`, the default `...defaultOptions` from the constructor and `...options`. The `ID` is later used to choose the toggle.

##### `goto(ID)`

Turns on the toggle with specified `ID` and turns off all the others.

##### `enableOnDelay(seconds)`

Delays turning on the toggle in all subsequent `goto` calls. Turning off other toggles is not affected.

