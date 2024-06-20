import { getName, getIcons } from './lib/repo/index.js';
import { optimize } from './lib/svg/optimize.js';
import { rename } from './lib/component/name.js';
import { bundle } from './lib/bundle/index.js';
import { make as makeBarrel } from './lib/component/barrel.js';
import { createAll } from './lib/component/index.js';
import { Progress } from './lib/util/progress.js';

const generate = async (
  repo,
  options = { branch: 'main', dir: '', dest: 'tmp', strip: false, debug: false }
) => {
  const { branch, dest, dir, strip, debug } = options;

  const progress = Progress(5);
  const repoName = getName(repo);
  let svgFiles, svgs, components;

  console.log('=> ' + repoName);

  progress.update('Downloading repo');
  try {
    svgFiles = await getIcons(repo, branch, dir);
  } catch (error) {
    let notFound = error.response && error.response.status === 404;
    console.log(error);
    return null;
  }

  progress.update('Optimizing SVGs');
  try {
    const names = svgFiles.map((path) => {
      return path.split('/').slice(-1)[0].replace('.svg', '');
    });
    svgs = svgFiles.map((path) => ({
      html: optimize(path),
      name: rename(path, names, strip),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }

  try {
    progress.update('Creating components');
    components = await createAll(svgs, dest + '/' + repoName);
    if (components.length === 0) {
      console.log('no components made');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  try {
    progress.update('Creating index');
    makeBarrel({ components });
  } catch (error) {
    console.log('no barrel');
    if (debug) console.error(error);
    else {
      console.error('Could not create barrel file: ' + error.message);
    }
    return null;
  }

  progress.update('Bundling');
  try {
    await bundle({
      entry: dest + '/' + repoName + '/index.js',
      dest: dest + '/' + repoName,
      name: repoName,
      fileName: 'index',
    });
  } catch (error) {
    console.log(error);
    return null;
  }

  return dest + '/' + repoName;
};

export { generate };
