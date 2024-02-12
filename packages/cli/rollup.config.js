import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import { visualizer } from 'rollup-plugin-visualizer';

export default {
  input: 'index.js',
  output: {
    // dir: 'dist',
    file: 'dist/cli.js',
    format: 'cjs',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    json({
      compact: true,
    }),
    // visualizer({ filename: './tmp/bundle-analysis.html', open: true }),
  ],

  external: ['path', 'fs', 'process', 'url', 'rollup', /rollup\//],
};
