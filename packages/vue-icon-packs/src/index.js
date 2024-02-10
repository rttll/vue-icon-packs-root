import jetpack from 'fs-jetpack';
import manifest from './manifest.js';
import bundle from './actions/bundle/index.js';
import { rename } from './actions/component/name.js';
import { process } from './actions/component/svg.js';
import { save } from './actions/component/index.js';

(async function () {
  console.log('Generating components...');

  for (let library of manifest) {
    let sources = jetpack
      .cwd('../../')
      .find(`node_modules/${library.path}`, {
        matching: '*.svg',
        recursive: true,
      })
      .map((path) => `../../${path}`);

    if (library.excludeFile) {
      sources = sources.filter((str) => {
        let filename = str;
        filename = filename.split('/').pop();
        return !library.excludeFile.test(filename);
      });
    }

    const names = sources.map((path) =>
      path.split('/').slice(-1)[0].replace('.svg', '')
    );
    const svgs = sources.map((path) => ({
      html: process(path),
      name: rename(path, names, library.stripFilename),
    }));

    save(library, svgs);
  }

  await bundle();
})();
