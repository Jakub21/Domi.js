
class NestedSwitcher {
  constructor(structure) {
    this.switchers = {};
    this.swStack = [];
    this.buildStructure(structure);
  }
  getPath() {
    let path = '';
    let tree = this.switchers.Root;
    while (true) {
      let target = tree.current;
      path += '.' + target;
      if (this.switchers[target] == undefined) break;
      tree = this.switchers[target];
    }
    return path.slice(1);
  }
  goto(switcherID, sectionID) {
    this.switchers[switcherID].goto(sectionID);
  }
  back(switcherID) {
    this.switchers[switcherID].back();
  }
  buildStructure(structure) {
    this.switchers.Root = new Switcher();
    this.swStack.push(this.switchers.Root);
    for (let [ID, section] of Object.entries(structure.children)) {
      this.buildSection(ID, section);
    }
    if (structure.default != undefined) {
      this.switchers.Root.goto(structure.default);
    }
    this.swStack.pop();
  }
  buildSection(ID, data) {
    let swParent = this.swStack[this.swStack.length-1];
    if (data.toggles == undefined) data.toggles = [];
    let section = new Section(ID, data.section, data.toggles,
      data.onEnter, data.onLeave);
    swParent.addSection(section);
    if (data.button != undefined) {
      $on(data.button, 'click', ()=>{swParent.goto(ID);});
    }
    if (data.children != undefined) {
      this.switchers[ID] = new Switcher();
      this.swStack.push(this.switchers[ID]);
      for (let [ID, child] of Object.entries(data.children))
        this.buildSection(ID, child);
      if (data.default != undefined) {
        this.switchers[ID].goto(data.default);
      }
      this.swStack.pop();
    }
  }
}
