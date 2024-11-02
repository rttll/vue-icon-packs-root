import jetpack from 'fs-jetpack';
import manifest from './manifest.js';
import bundle from './actions/bundle/index.js';
import { rename } from './actions/component/name.js';
import { process, save as saveSVG } from './actions/component/svg.js';
import { save } from './actions/component/index.js';
import { save as saveHashes } from './util/hash.js';

const copyHashes = () => {
  const src = `./tmp/hashes`;
  const srcDirs = jetpack.list(src) || [];
  for (const dir of srcDirs) {
    jetpack.copy(`${src}/${dir}`, `./tests/hashes/${dir}`, { overwrite: true });
  }
};

const clean = () => {
  jetpack.remove('tmp/components');
  jetpack.remove('tmp/svg');
  jetpack.remove('tmp/entries');
  jetpack.remove('tmp/hashes');
};

(async function () {
  console.log('Cleaning up previous build...');
  clean();

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

    jetpack.remove(`tmp/components/${library.id}`);

    saveSVG(library, svgs);
    saveHashes(library, svgs);
    save(library, svgs);
  }

  copyHashes();

  await bundle();
})();
