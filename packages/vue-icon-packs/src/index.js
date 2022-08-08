const manifest = require('./packs.manifest.js');
const bundle = require('./actions/bundle');
const { make } = require('./actions/components');

(async function () {
  console.log('Generating components...');

  let packs = manifest;
  // packs = packs.filter((p) => p.id === 'hi');

  for (let lib of packs) {
    make(lib);
  }

  await bundle();
})();
