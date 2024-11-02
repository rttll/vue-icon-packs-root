import crypto from 'crypto';
import jetpack from 'fs-jetpack';

import manifest from '../manifest.js';

function generate(content) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(content))
    .digest('hex');
}

// Accumulated the versions of all the libraries in the manifest
// Used to determine if any of the icon libraries have changed.

const _hashes_id = () => {
  const removeString = 'https://github.com/rttll/';

  const libraries = manifest.map((lib) => lib.path.split('/')[0]);
  const pkg = JSON.parse(jetpack.read('./package.json'));
  const keys = Object.keys(pkg.devDependencies);

  const versions = libraries.map((lib) => {
    const key = keys.filter((key) => key.startsWith(lib))[0];
    if (key) {
      const version = pkg.devDependencies[key];
      return version.replace(removeString, '').replace('#', '');
    }
    throw new Error(`No version found for ${lib}`);
  });

  return versions.join('');
};

const save = (library, svgs) => {
  const hashes = {};
  for (let svg of svgs) {
    const hash = generate(svg.html);
    hashes[svg.name] = hash;
  }

  const id = _hashes_id();
  jetpack.write(`tmp/hashes/${id}/${library.id}.json`, JSON.stringify(hashes));
};

export { generate, save };
