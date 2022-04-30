const ObjectInsert = require('./ObjectInsert');

module.exports = class ObjectShpInsert extends ObjectInsert {
  constructor() {
    super();
    try {this.compiler = new shp.Compiler()}
    catch(err) {}
  }

  appendShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.append(new _class(node));
    return this;
  }
  prependShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.prepend(new _class(node));
    return this;
  }
  beforeShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.before(new _class(node));
    return this;
  }
  afterShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.after(new _class(node));
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
