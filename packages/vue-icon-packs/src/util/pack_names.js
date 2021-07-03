// import list from '../packs.manifest';
const list = require('../packs.manifest');

let names = list.map((obj) => `\`${obj.name}\``);
console.log(names.join(', '));
