import jetpack from 'fs-jetpack';
import { describe, expect, test } from 'vitest';

import { generate } from '../src/util/hash.js';

/**
 * Test if all previous icons are still included and have the same hash.
 */

const HASHES_ID = '1.0.44.1.0octicons.git14.2.27.2.22.1.42.47.0iconoir.git';

const getCurrentIcons = (library) => {
  const dir = `./tmp/svg/${library}`;
  const files = jetpack.list(dir) || [];
  return files.reduce((acc, file) => {
    const name = file.replace('.svg', '');
    acc[name] = jetpack.read(`${dir}/${file}`);
    return acc;
  }, {});
};

const previousIconHashes = async (library) => {
  const path = `./tests/hashes/${HASHES_ID}/${library}.json`;
  const { default: hashes } = await import(path);
  return hashes;
};

describe('Hero Icons', async () => {
  const hashes = await previousIconHashes('hi');
  const currentIcons = getCurrentIcons('hi');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});

describe('Remix Icon', async () => {
  const hashes = await previousIconHashes('ri');
  const currentIcons = getCurrentIcons('ri');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});

describe('Octicons', async () => {
  const hashes = await previousIconHashes('oc');
  const currentIcons = getCurrentIcons('oc');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});

describe('Ionicons', async () => {
  const hashes = await previousIconHashes('io');
  const currentIcons = getCurrentIcons('io');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});

describe('Box Icons', async () => {
  const hashes = await previousIconHashes('bx');
  const currentIcons = getCurrentIcons('bx');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});

describe('Tabler Icons', async () => {
  const hashes = await previousIconHashes('ti');
  const currentIcons = getCurrentIcons('ti');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});

describe('Iconoir', async () => {
  const hashes = await previousIconHashes('in');
  const currentIcons = getCurrentIcons('in');
  const currentIconNames = Object.keys(currentIcons);

  Object.keys(hashes).forEach((prevIcon) => {
    describe(`${prevIcon}`, () => {
      test(`is included`, async () => {
        expect(currentIconNames).toContain(prevIcon);
      });

      test(`hash matches`, () => {
        const svg = currentIcons[prevIcon];
        const hash = generate(svg);
        expect(hashes[prevIcon]).toBe(hash);
      });
    });
  });
});
