import { generate } from 'vue-icon-packs-api';
import path from 'path';

const run = async (input, flags = {}) => {
  const dest = path.resolve(process.cwd());
  await generate(input, { dest, ...flags });

  console.log('Components saved to ', dest);
};

export default run;
