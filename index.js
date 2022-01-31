const fs = require('fs');

const entryPoint = `${__dirname}/webIndex.js`;
const buildDir = `${__dirname}/build/`;
const buildFile = `${buildDir}/Domi.js`;

let buildPackage = () => {
  const browserify = require('browserify')();
  browserify.add(entryPoint);
  let stream = browserify.bundle();
  let content = '';
  stream.on('data', (data) => { content += data; });
  stream.on('end', () => { fs.writeFileSync(buildFile, content); });
}

fs.stat(buildFile, (err) => {
  if (err == null) return;
  fs.mkdirSync(buildDir, {recursive: true});
  buildPackage();
});

module.exports.path = buildFile;
