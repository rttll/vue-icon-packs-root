import { generate as genLib } from '../../api/index.js';
import path from 'path';

const generate = async (input, flags = {}) => {
  const dest = path.resolve(process.cwd());
  await genLib(input, dest, flags.bundle);

  console.log('Components saved to ', dest);
};

export default generate;
