import FlexSearch from 'flexsearch';
import searchDB from './search.db.json';

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

const _downcase = (str) => {
  return str.replace(/[A-Z]/, (match) => match.toLowerCase());
};

const search = (query, libID) => {
  if (!query || query === '') {
    query = '1622594198305';
  }
  let options = {
    field: 'terms',
    query: _downcase(query),
  };
  return new Promise((resolve) => {
    debugger;
    if (!_index[libID]) {
      console.log('no', libID);
      resolve([]);
    }
    let resp = _index[libID].search(options);
    resolve(resp);
  });
};

const _addDocs = () => {
  for (let lib of searchDB) {
    _createIndex(lib.id);
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
    _index[lib.id].add(docs);
  }
};

const init = () => {
  return new Promise((resolve) => {
    _addDocs();
    resolve();
  });
};

export { init, search };
