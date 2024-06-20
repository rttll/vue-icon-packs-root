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

const create = async (svg, dest) => {
  const component = toTemplate(svg.name, svg.html);
  const out = dest + '/components/' + svg.name + '.vue';
  await toFile(out, component);
  return out;
};

const createAll = async (svgs, dest) => {
  try {
    const resp = await Promise.all(
      svgs.map(async (svg) => {
        try {
          return await create(svg, dest);
        } catch (error) {
          console.log(error);
          return null;
        }
      })
    );
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { createAll };
