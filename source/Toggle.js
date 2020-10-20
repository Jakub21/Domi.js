class DomStateToggle {
  constructor(element, state=true, options={}) {
    this.element = element;
    this.state = true;
    this.trueClass = options.trueClass;
    this.falseClass = options.falseClass;
    this.hide = options.hide;
    this.enabled = true;
    if (state) this.toggle();
  }
  static placeholder() {
    let element = $create('p');
    element.innerText = 'placeholder';
    element.hidden = true;
    return new DomStateToggle(element, false);
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
    this.element.classList.toggle(this.trueClass);
    this.element.classList.toggle(this.falseClass);
    if (this.hide) this.element.hidden = !this.state;
  }
  on() {
    if (!this.enabled) return;
    if (this.state) return;
    this.state = true;
    this.element.classList.add(this.trueClass);
    this.element.classList.remove(this.falseClass);
    if (this.hide) this.element.hidden = false;
  }
  off() {
    if (!this.enabled) return;
    if (!this.state) return;
    this.state = false;
    this.element.classList.remove(this.trueClass);
    this.element.classList.add(this.falseClass);
    if (this.hide) this.element.hidden = true;
  }
}
