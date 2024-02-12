import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { build } from 'vite';
import { cwd } from 'process';

/**
 * Bundles all the .vue files into esm format.
 */

const __dir = cwd();

const bundle = async (args) => {
  const { entry, dest, name, fileName } = args;
  await build({
    root: resolve(__dir, dest), // Exports empty objects unless root is set
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dir, entry),
        name,
        fileName,
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

export { bundle };
