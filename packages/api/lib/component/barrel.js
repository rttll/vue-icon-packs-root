import fs from 'fs';

const make = ({ components }) => {
  const content = components.reduce(
    (acc, path) => {
      const fileName = path.split('/').pop(),
        iconName = fileName.replace('.vue', ''),
        importPath = `./components/${fileName}`;

      acc.imports.push(`import ${iconName} from '${importPath}' `);
      acc.names.push(iconName);
      return acc;
    },
    {
      imports: [],
      names: [],
    }
  );

  let base = `
    ${content.imports.join(';')}
    export { ${content.names.join(', ')} }
  `;
  const dest = components[0].split('/').slice(0, -2).join('/');

  fs.writeFile(`${dest}/index.js`, base, (err) => {
    if (err) throw err;
  });
};

export { make };
