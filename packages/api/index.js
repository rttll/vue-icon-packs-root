import path from 'path';
import { download, getRepoName } from './lib/repo/download.js';
import { unzip } from './lib/repo/unzip.js';
import { find } from './lib/svg/find.js';
import { optimize } from './lib/svg/optimize.js';
import { rename } from './lib/component/name.js';
import { bundle } from './lib/bundle/index.js';
import { toTemplate, toFile, makeIndex } from './lib/component/index.js';
import { files, make } from './lib/util/dir.js';

let repoName;

const getFiles = async (repo) => {
  const _download = async (repo) => {
    const downloaded = await download(repo);
    const dest = downloaded.split('.zip')[0];
    unzip(downloaded, dest);
    return dest;
  };

  const _findSVG = async (dir) => {
    const unzippedDirName = `${repoName}-main`;
    const unzippedFullPath = path.join(dir, unzippedDirName);
    return await find(unzippedFullPath);
  };

  const dir = await _download(repo);
  return await _findSVG(dir);
};

const createComponents = (svgs, dest) => {
  const _dest = dest + '/' + repoName;
  return Promise.all(
    svgs.map(async (svg) => {
      const component = toTemplate(svg.name, svg.html);
      const out = _dest + '/components/' + svg.name + '.vue';
      await toFile(out, component);
      return out;
    })
  );
};

const generate = async (repo, dest = 'tmp') => {
  repoName = getRepoName(repo);

  console.log('Downloading ' + repo);
  const svgFiles = await getFiles(repo);

  console.log('Optimizing SVGs');
  const names = svgFiles.map((path) =>
    path.split('/').slice(-1)[0].replace('.svg', '')
  );
  const svgs = svgFiles.map((path) => ({
    html: optimize(path),
    name: rename(path, names),
  }));

  console.log('Creating components');
  const components = await createComponents(svgs, dest);

  console.log('Creating index');
  makeIndex({ components });

  console.log('Bundling');
  bundle({
    entry: dest + '/' + repoName + '/index.js',
    dest: dest + '/' + repoName,
    name: repoName,
    fileName: 'index',
  });
};

// const repo = 'primer/octicons';
const repo = 'https://github.com/iconoir-icons/iconoir';
await generate(repo, 'tmp');
