import jetpack from 'fs-jetpack';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { build } from 'vite';
import manifest from '../../manifest.js';
import entry from './entry.js';

/**
 * bundle.js
 * Bundles all the .vue files into esm format.
 * and calls entries.js
 */

const __dir = jetpack.cwd();

const move = (id) => {
  const src = `./dist/${id}/dist`;
  const tree = jetpack.inspectTree(resolve(__dir, src));

  for (const file of tree.children) {
    jetpack.move(`${src}/${file.name}`, `./dist/${id}/${file.name}`, {
      overwrite: true,
    });
  }
  jetpack.remove(src);
};

const bundle = async (id) => {
  await build({
    // Exports empty objects unless root is set
    root: resolve(__dir, `./dist/${id}`),
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dir, `tmp/entries/${id}.js`),
        name: `${id}`,
        fileName: `${id}`,
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

export default async function () {
  console.log('Bundling...');

  for (let lib of manifest) {
    entry(lib.id);
    await bundle(lib.id);
    move(lib.id);
  }
}
