import path from 'path';
import { download } from './download.js';
import { unzip } from './unzip.js';
import { files } from '../util/dir.js';

const getName = (repo) => {
  return repo.split('/').pop();
};

const getIcons = async (repo, branch, dir) => {
  const repoName = getName(repo);

  const _download = async (repo, branch) => {
    const downloaded = await download(repo, branch);
    const dest = downloaded.split('.zip')[0];
    unzip(downloaded, dest);
    return dest;
  };

  const _findSVG = async (downloaded, dir) => {
    const unzippedDirName = `${repoName}-${branch}`;
    const unzippedFullPath = path.join(downloaded, unzippedDirName, dir);
    return await files(unzippedFullPath);
  };

  const dowloaded = await _download(repo, branch);
  return await _findSVG(dowloaded, dir);
};

export { getName, getIcons };
