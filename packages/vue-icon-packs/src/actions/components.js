const jetpack = require('fs-jetpack');
const reserved = require('../util/reserved');
const string = require('../util/string');
const { process } = require('../util/svg');

const config = {};

function _saveFile(svg, name) {
  const template = `
      <template>${svg}</template>
      <script> export default { name: '${name}'};</script>
    `;
  jetpack.write(`tmp/components/${config.library.id}/${name}.vue`, template);
}

function _newIconName(path) {
  let [dir, name] = path
    .split('/')
    .slice(-2)
    .map((str) => str.replace('.svg', ''));

  // Fix icon variants in different dirs w/ the same filename
  // e.g. /solid/name => name-solid ... /outline/name => name-outline
  // TODO: add default name setting so only one gets appended
  let names = config.sources.map((path) =>
    path.split('/').slice(-1)[0].replace('.svg', '')
  );
  let same = names.filter((n) => n === name);
  if (same.length > 1) {
    name += '-' + dir;
  }

  // Apply any regex from settings.
  // This has to go before toWords and pascal
  if (config.library.stripFilename) {
    name = name.replace(config.library.stripFilename, '');
  }

  name = string.intToWords(name);
  name = string.toPascalCase(name).replace(/-/g, '').replace(/\s/g, '');

  // name is a reserved html/svg word. e.g. Font
  if (reserved(name)) {
    name += 'Icon';
  }
  return name;
}

const make = (library) => {
  config.library = library;
  config.sources = jetpack
    .cwd('../../')
    .find(`node_modules/${library.path}`, {
      matching: '*.svg',
      recursive: true,
    })
    .map((path) => `../../${path}`);

  jetpack.remove(`tmp/components/${library.id}`);

  if (library.excludeFile) {
    config.sources = config.sources.filter((str) => {
      let filename = str;
      filename = filename.split('/').pop();
      return !library.excludeFile.test(filename);
    });
  }

  for (let path of config.sources) {
    const svg = process(path);
    if (!svg) continue;

    const name = _newIconName(path);
    _saveFile(svg, name);
  }
};

exports.make = make;
