import path from 'path';

import { expect, test } from 'vitest';
import * as hi from 'dist/hi/hi.js';
import icons from './factories/hi.js';

icons.forEach((iconName) => {
  test(`"${iconName}" should be exported from hi`, () => {
    expect(hi[iconName]).toBeDefined();
  });
});
