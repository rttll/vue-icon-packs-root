import AdmZip from 'adm-zip';

const unzip = (path, dest) => {
  const zip = new AdmZip(path);
  try {
    zip.extractAllTo(dest, true);
  } catch (error) {
    console.error(error);
  }
};

export { unzip };
