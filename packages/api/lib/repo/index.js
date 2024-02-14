import path from 'path';
import { download } from './download.js';
import { unzip } from './unzip.js';
import { files } from '../util/dir.js';

const getName = (repo) => {
  return repo.split('/').pop();
};

const getIcons = async (repo, branch) => {
  const repoName = getName(repo);

  const _download = async (repo, branch) => {
    const downloaded = await download(repo, branch);
    const dest = downloaded.split('.zip')[0];
    unzip(downloaded, dest);
    return dest;
  };

  const _findSVG = async (dir) => {
    const unzippedDirName = `${repoName}-${branch}`;
    const unzippedFullPath = path.join(dir, unzippedDirName);
    return await files(unzippedFullPath);
  };

  const dir = await _download(repo, branch);
  return await _findSVG(dir);
};

export { getName, getIcons };
