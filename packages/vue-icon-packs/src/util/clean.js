import jetpack from 'fs-jetpack';
import manifest from '../manifest.js';

/**
 * Deletes all the generated/dist files
 */

(function () {
  for (let lib of manifest) {
    jetpack.remove(`./${lib.id}`);
  }
  jetpack.remove(`./tmp`);
  jetpack.remove(`./dist`);
  jetpack.remove(`./svg`);
})();
