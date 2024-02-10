import jetpack from 'fs-jetpack';

function getEntries(path) {
  const paths = jetpack.find(path, {
    matching: '*.vue',
    recursive: false,
  });
  return paths;
}

const makeDist = (id) => {
  const template = `{
    "module": "../dist/${id}/${id}.js",
    "main": "../dist/${id}/${id}.umd.js",
    "sideEffects": false
  }`;
  jetpack.write(`${id}/package.json`, template);
};

export default function (id) {
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

  makeDist(id);
}
