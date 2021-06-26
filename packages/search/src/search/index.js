import FlexSearch from 'flexsearch';
import list from './packs.manifest.js';

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
    if (!_index[libID]) {
      console.log('no', libID);
      resolve([]);
    }
    let resp = _index[libID].search(options);
    resolve(resp);
  });
};

const _addDocs = () => {
  let indexes = [];
  for (let lib of list) {
    indexes.push(
      new Promise((resolve) => {
        _createIndex(lib.id);
        import(`./db/${lib.id}.json`).then((resp) => {
          let docs = resp.icons.map((obj) => {
            obj.terms = obj.terms.join(' ');
            return {
              ...obj,
              libID: lib.id,
              lib: {
                id: lib.id,
                name: lib.name,
              },
            };
          });
          _index[lib.id].add(docs);
          resolve();
        });
      })
    );
  }
  return Promise.all(indexes);
};

const init = () => {
  return _addDocs();
};

export { init, search };
