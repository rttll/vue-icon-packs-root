import { getName, getIcons } from './lib/repo/index.js';
import { optimize } from './lib/svg/optimize.js';
import { rename } from './lib/component/name.js';
import { bundle } from './lib/bundle/index.js';
import { make as makeBarrel } from './lib/component/barrel.js';
import { createAll } from './lib/component/index.js';
import { Progress } from './lib/util/progress.js';

const generate = async (repo, options = { branch: 'main', dest: 'tmp' }) => {
  const { branch, dest } = options;

  const progress = Progress(5);
  const repoName = getName(repo);

  progress.update('Downloading repo');
  const svgFiles = await getIcons(repo, branch);

  progress.update('Optimizing SVGs');
  const names = svgFiles.map((path) =>
    path.split('/').slice(-1)[0].replace('.svg', '')
  );
  const svgs = svgFiles.map((path) => ({
    html: optimize(path),
    name: rename(path, names),
  }));

  progress.update('Creating components');
  const components = await createAll(svgs, dest + '/' + repoName);

  progress.update('Creating index');
  makeBarrel({ components });

  progress.update('Bundling');
  await bundle({
    entry: dest + '/' + repoName + '/index.js',
    dest: dest + '/' + repoName,
    name: repoName,
    fileName: 'index',
  });
};

export { generate };
