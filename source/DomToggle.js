
class DomToggle {
  constructor(element, state=true, options={}) {
    this.element = element;
    this.state = true;
    this.trueClass = options.trueClass;
    this.falseClass = options.falseClass;
    this.hide = options.hide;
    this.invertHide = options.invertHide;
    this.enabled = true;
    if (state) {
      if (options.falseClass != undefined)
        this.element.classList.add(options.falseClass);
    } else {
      if (options.trueClass != undefined)
        this.element.classList.add(options.trueClass);
      this.toggle();
    }
  }
  static placeholder() {
    let element = $create('p');
    element.innerText = 'placeholder';
    element.hidden = true;
    return new DomStateToggle(element, false);
  }
  setHidenFlag(state) {
    if (this.invertHide) state = !state;
    this.element.hidden = state;
  }
  bind(domi, key) {
    domi.kb.bind(key, (evt) => {this.toggle();});
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
  toggle() {
    if (!this.enabled) return;
    this.state = !this.state;
    if (this.trueClass != undefined)
      this.element.classList.toggle(this.trueClass);
    if (this.falseClass != undefined)
      this.element.classList.toggle(this.falseClass);
    if (this.hide) this.setHidenFlag(!this.state);
  }
  on() {
    if (!this.enabled) return;
    if (this.state) return;
    this.state = true;
    if (this.trueClass != undefined)
      this.element.classList.add(this.trueClass);
    this.element.classList.remove(this.falseClass);
    if (this.hide) this.setHidenFlag(false);
  }
  off() {
    if (!this.enabled) return;
    if (!this.state) return;
    this.state = false;
    this.element.classList.remove(this.trueClass);
    if (this.falseClass != undefined)
      this.element.classList.add(this.falseClass);
    if (this.hide) this.setHidenFlag(true);
  }
}
