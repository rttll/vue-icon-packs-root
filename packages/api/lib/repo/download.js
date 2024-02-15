import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { make } from '../util/dir.js';
import { getName } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function download(repo, branch = 'main') {
  const repoName = getName(repo);
  const destDir = path.join(__dirname, '../../tmp/libraries');
  const destPath = path.join(destDir, `${repoName}.zip`);
  const sanitizedRepo = repo.replace(/\/+$/, '');
  const url = `${sanitizedRepo}/archive/refs/heads/${branch}.zip`;

  console.log('Downloading', url);

  make(destDir);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  const writer = fs.createWriteStream(destPath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      writer.close(); // Ensure the stream is closed
      resolve(destPath);
    });
    writer.on('error', (error) => {
      reject({ error });
    });
  });
}

export { download };
