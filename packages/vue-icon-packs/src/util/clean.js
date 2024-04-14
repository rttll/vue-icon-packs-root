import fs from 'fs';
import path from 'path';
import manifest from '../manifest.js';

/**
 * Deletes all the generated/dist files
 */

(function () {
  const deleteFolderRecursive = function (directoryPath) {
    if (fs.existsSync(directoryPath)) {
      fs.readdirSync(directoryPath).forEach((file) => {
        const curPath = path.join(directoryPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(directoryPath);
    }
  };
  for (let lib of manifest) {
    deleteFolderRecursive(`./${lib.id}`);
  }
  deleteFolderRecursive(`./dist`);
})();
