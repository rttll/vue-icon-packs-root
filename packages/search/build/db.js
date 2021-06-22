import path from 'path';
import jetpack from 'fs-jetpack';
import { parse } from 'svgson';
import { Low, JSONFile } from 'lowdb';
import list from '../../vue-icon-packs/src/packs.manifest.js';

function getInputFiles(libId) {
  const paths = jetpack.find(`../vue-icon-packs/temp/svg/${libId}`, {
    matching: '*.svg',
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

const buildSearchEntry = async (lib, path) => {
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

async function buildSearchEntries(lib, inputFiles) {
  let entry = {
    id: lib.id,
    name: lib.name,
    icons: [],
  };
  for (const file of inputFiles) {
    entry.icons.push(await buildSearchEntry(lib, file));
  }
  return entry;
}

(function() {
  console.log('Build search indexes...');
  let actions = [];
  let i = 0;
  for (const lib of list) {
    i++;
    actions.push(
      new Promise(async (resolve) => {
        let inputFiles = getInputFiles(lib.id);
        let col = await buildSearchEntries(lib, inputFiles);
        resolve(col);
      })
    );
  }
  Promise.all(actions).then((libs) => {
    for (const lib of libs) {
      const file = `src/search/db/${lib.id}.json`;
      jetpack.file(file);
      const adapter = new JSONFile(file);
      const db = new Low(adapter);
      db.data = lib;
      db.write();
    }
  });
})();
