
class AnimatedSwitcher extends Switcher {
  setAnimationData(data) {
    this.anim = data;
    // {leavingCn:className, enteringCn:className, lDelay:ms, eDelay:ms}
  }
  goto(id) {
    let current = this.sections[this.current];
    let next = this.sections[id];
    if (current != undefined) {
      current.section.classList.add(this.anim.leavingCn);
    }
    next.section.classList.add(this.anim.enteringCn);
    setTimeout((id) => {
      let current = this.sections[this.current];
      let next = this.sections[id];
      if (current != undefined) this.sections[this.current].hide();
      next.show();
    }, this.anim.lDelay, id);
    setTimeout((id) => {
      let current = this.sections[this.current];
      let next = this.sections[id];
      next.section.classList.remove(this.anim.enteringCn);
      if (current != undefined)
        current.section.classList.remove(this.anim.leavingCn);
      this.previous = this.current;
      this.current = id;
    }, this.anim.lDelay+this.anim.eDelay, id);
  }
}
