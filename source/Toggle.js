
class DomStateToggle {
  constructor(element, state, trueClass=null, falseClass=null, hide=false) {
    this.element = element;
    this.state = state;
    this.trueClass = trueClass;
    this.falseClass = falseClass;
    this.hide = hide;
    this.element.classList.add(state ? trueClass : falseClass);
    if (hide && !state) this.element.hidden = true;
    this.enabled = true;
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
