import path from 'path';
import { generate } from 'vue-icon-packs-api';

import { makeDist, move } from './actions/dist.js';
import manifest from './manifest.js';

const afterBundle = (lib, bundle) => {
  makeDist(lib);
  move(lib, bundle);
};

const dest = path.resolve(process.cwd(), 'tmp/components');
const handler = async (lib) => {
  try {
    return await generate(lib.repo, {
      dest,
      branch: lib.branch || 'main',
      dir: lib.dir || '',
      strip: lib.strip || null,
      exclude: lib.exclude || null,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

for (let lib of manifest) {
  const bundle = await handler(lib);
  if (bundle === null) break;
  afterBundle(lib, bundle);
}
