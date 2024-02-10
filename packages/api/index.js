import path from 'path';
import { download, getRepoName } from './lib/download.js';
import { unzip } from './lib/unzip.js';
import { find } from './lib/svg/find.js';
import { optimize } from './lib/svg/optimize.js';
import { rename } from './lib/name.js';

const generate = async (repo, dest) => {
  const resp = await download(repo);
  const { destPath, destDir } = resp;
  unzip(destPath, destDir);

  const repoName = getRepoName(repo);
  const unzippedDirName = `${repoName}-main`;
  const unzippedFullPath = path.join(destDir, unzippedDirName);

  const svgFiles = await find(unzippedFullPath);

  const names = svgFiles.map((path) =>
    path.split('/').slice(-1)[0].replace('.svg', '')
  );
  const svgs = svgFiles.map((path) => ({
    html: optimize(path),
    name: rename(path, names),
  }));
  console.log(svgs);
};

// module.exports = {
//   generate,
// };

const repo = 'primer/octicons';
generate(repo);
