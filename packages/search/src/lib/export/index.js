import FlexSearch from 'flexsearch';
import searchDB from '../search.db.json';
import jetpack from 'fs-jetpack';

let _index = {};

const _createIndex = (id) => {
  _index[id] = new FlexSearch({
    encode: 'icase',
    tokenize: 'full',
    depth: 0,
    threshold: 1,
    doc: {
      id: 'id',
      field: ['terms', 'libID', 'lib:id', 'lib:name'],
    },
  });
};

const _export = (id) => {
  let file = _index[id].export();
  jetpack.write(`src/lib/indexes/index.${id}.json`, file);
};

const _addDocs = () => {
  for (let id in searchDB) {
    console.log('LIB ' + id);
    _createIndex(id);
    let lib = searchDB[id];
    let docs = lib.icons
      .map((obj) => {
        if (!Array.isArray(obj.terms)) {
          console.log('no arrya ' + obj);
          return null;
        }
        obj.terms = obj.terms.join(' ');
        return {
          ...obj,
          libID: lib.id,
          lib: {
            id: lib.id,
            name: lib.name,
          },
        };
      })
      .filter((obj) => obj);
    _index[id].add(docs);
    _export(id);
  }
};

_addDocs();
