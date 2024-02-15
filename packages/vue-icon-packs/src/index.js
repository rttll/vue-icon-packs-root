import path from 'path';

import { generate } from 'vue-icon-packs-api';
import manifest from './manifest.js';

(async function () {
  let shouldBundle = true;

  for (let lib of manifest.slice(0, 1)) {
    const dest = path.resolve(process.cwd(), 'tmp/components');
    try {
      const success = await generate(lib.repo, {
        dest,
        branch: lib.branch || 'main',
      });
      if (!success) {
        shouldBundle = false;
        break;
      }
    } catch (error) {
      console.log('nope');
      shouldBundle = false;
      break;
    }
  }
})();
