
class Switcher {
  constructor() {
    this.current = '';
    this.previous = '';
    this.sections = {};
  }
  setMenuToggle(menuToggle) {
    this.menuToggle = menuToggle;
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
  constructor(id, menu=false, onEnter=null, onLeave=null) {
    this.id = id;
    this.section = $id(id);
    this.menu = menu;
    this.onEnter = onEnter;
    this.onLeave = onLeave;
  }
  show() {
    this.section.hidden = false;
    if (this.onEnter != undefined) this.onEnter();
    if (this.menu) this.switcher.menuToggle.enable();
    else this.switcher.menuToggle.disable();
  }
  hide(auto=false) {
    this.section.hidden = true;
    this.switcher.menuToggle.off();
    if (this.onLeave != undefined && !auto) this.onLeave();
  }
}
