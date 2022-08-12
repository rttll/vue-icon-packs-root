import manifest from './manifest.js';
import bundle from './actions/bundle/index.js';
import { make } from './actions/component/index.js';

(async function () {
  console.log('Generating components...');

  for (let lib of manifest) {
    make(lib);
  }

  await bundle();
})();
