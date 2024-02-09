const fs = require('fs');
const path = require('path');

const { download, getRepoName } = require('./lib/download');
const { unzip } = require('./lib/unzip');
const { find, process } = require('./lib/svg');
const { rename } = require('./lib/name');

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
    html: process(path),
    name: rename(path, names),
  }));
  console.log(svgs);
};

// module.exports = {
//   generate,
// };

const repo = 'primer/octicons';
generate(repo);
