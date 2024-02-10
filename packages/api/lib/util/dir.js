import fs from 'fs';
const make = (dir, overwrite = true) => {
  if (!overwrite && fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} already exists`);
  }

  fs.mkdirSync(dir, { recursive: true });
};

export { make };
