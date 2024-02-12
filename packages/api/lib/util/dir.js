import fs from 'fs';
import fg from 'fast-glob';

function files(directory, ext = 'svg') {
  return fg(`${directory}/**/*.${ext.replace('.', '')}`);
}

const make = (dir, overwrite = true) => {
  if (!overwrite && fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} already exists`);
  }

  fs.mkdirSync(dir, { recursive: true });
};

export { make, files };
