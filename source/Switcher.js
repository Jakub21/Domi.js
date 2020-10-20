
class Switcher {
  constructor() {
    this.current = '';
    this.previous = '';
    this.sections = {};
    this.toggles = {};
  }
  addToggle(name, toggle) {
    this.toggles[name] = toggle;
    toggle.off();
  }
  addSection(section) {
    section.switcher = this;
    section.hide(true);
    this.sections[section.id] = section;
  }
  goto(id) {
    if (this.sections[id] == undefined) {
      console.error(`Can not switch to section "${id}", it does not exist`);
      return;
    }
    if (this.current != '') this.sections[this.current].hide();
    this.sections[id].show();
    this.previous = this.current;
    this.current = id;
  }
  back() {
    if (this.previous == '') return;
    this.goto(this.previous);
  }
}

class Section {
  constructor(id, element, toggles=[], onEnter=undefined, onLeave=undefined) {
    this.id = id;
    this.section = element;
    this.toggles = toggles;
    this.onEnter = onEnter;
    this.onLeave = onLeave;
  }
  show() {
    this.section.hidden = false;
    if (this.onEnter != undefined) this.onEnter();
    for (var toggle of this.toggles) {
      toggle.on();
    }
  }
  hide(auto=false) {
    this.section.hidden = true;
    for (var toggle of this.toggles) {
      toggle.off();
    }
    if (this.onLeave != undefined && !auto) this.onLeave();
  }
}
