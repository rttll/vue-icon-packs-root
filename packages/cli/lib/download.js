const fs = require('fs');
const path = require('path');
const axios = require('axios');

const getRepoName = (repo) => {
  return repo.split('/').pop();
};

async function download(repo) {
  const base = repo.includes('github.com') ? '' : 'https://github.com';
  const repoName = getRepoName(repo);
  const destDir = path.join(__dirname, 'libraries');
  const destPath = path.join(destDir, `${repoName}.zip`);
  const url = `${base}/${repo}/archive/main.zip`;

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  console.log(`Downloading ${url}`);

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
      resolve({ destPath, destDir });
    });
    writer.on('error', (error) => {
      reject({ error });
    });
  });
}

module.exports = {
  download,
  getRepoName,
};
