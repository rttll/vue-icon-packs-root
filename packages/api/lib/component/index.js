import { promises as fs } from 'fs';
import path from 'path';

function to_template(name, svg) {
  const str = `
      <template>${svg}</template>
      <script> export default { name: '${name}'};</script>
    `;
  return str;
}

const write_to_file = async (filePath, content) => {
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

export { write_to_file, to_template };
