import path from 'path';
import { download } from './download.js';
import { unzip } from './unzip.js';
import { files } from '../util/dir.js';

const getName = (repo) => {
  return repo.split('/').pop();
};

const getIcons = async (repo) => {
  const repoName = getName(repo);

  const _download = async (repo) => {
    const downloaded = await download(repo);
    const dest = downloaded.split('.zip')[0];
    unzip(downloaded, dest);
    return dest;
  };

  const _findSVG = async (dir) => {
    const unzippedDirName = `${repoName}-main`;
    const unzippedFullPath = path.join(dir, unzippedDirName);
    return await files(unzippedFullPath);
  };

  const dir = await _download(repo);
  return await _findSVG(dir);
};

export { getName, getIcons };
