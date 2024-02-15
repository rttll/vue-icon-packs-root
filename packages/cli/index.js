#!/usr/bin/env node
import meow from 'meow';
import generate from './lib/index.js';

const cli = meow(
  `
	Usage
	  $ vip <repo> --flags

	Options
    --bundle, -b Bundle the components

	Examples
	  $ vip https://github.com/foo/bar-icons  --dest=components
`,
  {
    importMeta: import.meta,
    flags: {
      branch: {
        type: 'string',
        shortFlag: 'b',
      },
      bundle: {
        type: 'boolean',
      },
    },
  }
);

generate(cli.input.at(0), cli.flags);
