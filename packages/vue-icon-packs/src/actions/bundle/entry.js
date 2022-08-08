const jetpack = require('fs-jetpack');

/**
 * entries.js
 * Makes all package entry files for each package (e.g. index.esm.js)
 * and adds them to dist/{packID}/index.esm.js
 *
 * Also makes all the /{packID} export dirs
 */

function getEntries(path) {
  const paths = jetpack.find(path, {
    matching: '*.vue',
    recursive: false,
  });
  return paths;
}

module.exports = function (id) {
  let imports = [],
    names = [];

  let paths = getEntries(`tmp/components/${id}`);

  for (const path of paths) {
    let fileName = path.split('/').pop();
    let iconName = fileName.replace('.vue', '');
    let importPath = `../components/${id}/${fileName}`;
    imports.push(`import ${iconName} from '${importPath}' `);
    names.push(iconName);
  }

  let base = `
    ${imports.join(';')}
    export { ${names.join(', ')} }
  `;
  jetpack.write(`tmp/entries/${id}.js`, base);
};
