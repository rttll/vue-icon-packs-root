import { promises as fs } from 'fs';
import path from 'path';

function toTemplate(name, svg) {
  const str = `
      <template>${svg}</template>
      <script> export default { name: '${name}'};</script>
    `;
  return str;
}

const toFile = async (filePath, content) => {
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory: ${err}`);
    throw err; // Rethrow or handle as needed
  }

  try {
    await fs.writeFile(filePath, content);
  } catch (err) {
    console.error(`Error writing file: ${err}`);
    throw err; // Rethrow or handle as needed
  }
};

const makeIndex = ({ components }) => {
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
    console.log('The file has been saved!');
  });
};

export { toFile, toTemplate, makeIndex };
