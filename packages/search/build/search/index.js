import jetpack from 'fs-jetpack';
import { parse } from 'svgson';
import { Low, JSONFile } from 'lowdb';
import config from '../import.config.js';

const file = 'search.db.json';
const adapter = new JSONFile(file);
const db = new Low(adapter);

function getEntries(path, matching = '*.vue') {
  const paths = jetpack.find(path, {
    matching: matching,
    recursive: false,
  });
  return paths;
}

const schema = (path) => {
  let fileName = path.split('/').pop();

  let iconName = fileName.replace('.svg', '');
  const template = {
    id: iconName,
    terms: [],
  };
  return template;
};

const getTerms = async (lib, path) => {
  let doc = schema(path);
  let iconNameParts = doc.id
    .replace(/[A-Z]/g, (match, offset) => {
      if (offset === 0) return match.toLowerCase();
      return '-' + match.toLowerCase();
    })
    // .replace(/solid|outline|icons/, '')
    .split('-')
    .filter((str) => str.length > 0);

  doc.terms = iconNameParts;
  doc.terms.push('1622594198305');

  let raw = jetpack.read(path);
  doc.svg = await parse(raw);
  return doc;
};

async function search(lib, paths) {
  let col = {
    id: lib.shortName,
    name: lib.name,
    icons: [],
  };
  for (const path of paths) {
    col.icons.push(await getTerms(lib, path));
  }
  return col;
}

(function() {
  let actions = [];

  for (const lib of config) {
    console.log(lib.name);
    actions.push(
      new Promise(async (resolve) => {
        let paths = getEntries(`temp/svg/${lib.shortName}/new`, '*.svg');
        let col = await search(lib, paths);
        resolve(col);
      })
    );
  }
  Promise.all(actions).then((libs) => {
    db.data = libs;
    db.write();
  });
})();
