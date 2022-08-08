const jetpack = require('fs-jetpack');
const resolve = require('path').resolve;
const vue = require('@vitejs/plugin-vue');
const build = require('vite').build;

const entry = require('./entry');

// const { progress } = require('./progress');

/**
 * bundle.js
 * Bundles all the .vue files into esm format.
 * and calls entries.js
 */

// const bars = {};

/**
 *
 * @param {Object} iconPack
 ** @param {Array} iconPack.children
 ** @param {String} iconPack.name
 * @param {Object} config
 ** @param {String} config.format
 ** @param {String} config.suffix
 ** @param {String} config.name
 *
 */

// const __dir = fileURLToPath(new URL('.', import.meta.url));
const __dir = jetpack.cwd();

const bundle = async (entry) => {
  await build({
    // Exports empty objects unless root is set
    root: resolve(__dir, `./dist/${entry}`),
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dir, `tmp/entries/${entry}.js`),
        name: `${entry}`,
        fileName: `${entry}`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  });
};

module.exports = async function () {
  console.log('Bundling...');
  const tree = jetpack.inspectTree('tmp/components').children;

  let packs = tree;

  /**
   * @val {Object} iconPack
   * e.g. {name: 'hi', type: 'dir', children: Array}
   * @val {Array} iconPack.children
   * e.g. [{name: 'Abacus.vue', type: 'file'}]
   */

  for (let iconPack of packs) {
    entry(iconPack.name);
    await bundle(iconPack.name);
  }
};
