const jetpack = require('fs-jetpack');

const config = require('../packs.manifest');

/**
 * Deletes all the generated/dist files
 */

(function () {
  for (let lib of config) {
    jetpack.remove(`./${lib.id}`);
  }
  jetpack.remove(`./tmp`);
  jetpack.remove(`./dist`);
})();
