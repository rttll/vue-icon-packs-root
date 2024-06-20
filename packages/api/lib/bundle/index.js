import { resolve } from 'path';
import { cwd } from 'process';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Bundles all the .vue files into esm format.
 */

const __dir = cwd();

const bundle = (args) => {
  const { entry, dest, name, fileName } = args;
  return build({
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
