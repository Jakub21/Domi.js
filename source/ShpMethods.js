
class ShpMethods {
  constructor() {
    try {this.compiler = new ShpCompiler()}
    catch(err) {}
  }
  appendShp(shp) {
    for (let node of this._buildShp(shp)) this.append(new DomiObject(node));
    return this;
  }
  prependShp(shp) {
    for (let node of this._buildShp(shp)) this.prepend(new DomiObject(node));
    return this;
  }
  beforeShp(shp) {
    for (let node of this._buildShp(shp)) this.before(new DomiObject(node));
    return this;
  }
  afterShp(shp) {
    for (let node of this._buildShp(shp)) this.after(new DomiObject(node));
    return this;
  }
  _buildShp(shp) {
    if (this.compiler == undefined) {
      console.error('SHP is not available');
      return;
    }
    this.compiler.reset();
    return this.compiler.compile(shp);
  }
}
