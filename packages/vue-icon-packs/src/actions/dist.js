import {
  readdirSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { join } from 'path';

const makeDist = (lib) => {
  const dirPath = lib.id;
  const filePath = `${dirPath}/package.json`;

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  const template = `{
    "name": "${lib.name}",
    "type": "module",
    "main": "../dist/${lib.id}/index.umd.cjs",
    "module": "../dist/${lib.id}/index.js",
    "exports": {
      ".": {
        "import": "../dist/${lib.id}/index.js",
        "require": "../dist/${lib.id}/index.umd.cjs"
      }
    },
    "sideEffects": false
  }`;

  writeFileSync(filePath, template);
};

const move = (lib, dir) => {
  const dest = `./dist/${lib.id}`;

  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  const files = readdirSync(`${dir}/dist`);
  files.forEach((file) => {
    const srcPath = join(`${dir}/dist`, file);
    const destPath = join(dest, file);
    copyFileSync(srcPath, destPath);
  });
};

export { makeDist, move };
