const AdmZip = require('adm-zip');

const unzip = (path, dest) => {
  const zip = new AdmZip(path);
  try {
    zip.extractAllTo(dest, true);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  unzip,
};
