import fs from 'fs';
const make = (dir, overwrite = true) => {
  if (!overwrite && fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} already exists`);
  }

  fs.mkdirSync(dir, { recursive: true });
};

const files = (dir, recursive = false) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let allFiles = [];
  files.forEach((file) => {
    if (file.isDirectory()) {
      if (recursive)
        allFiles = [...allFiles, ...getAllFiles(`${dir}/${file.name}`)];

      return;
    }
    allFiles.push(`${dir}/${file.name}`);
  });
  return allFiles;
};

export { make, files };
