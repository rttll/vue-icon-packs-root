// import list from '../packs.manifest';
const list = require('../packs.manifest');

let names = list.map((obj) => `\`${obj.name}\``);
console.log(names.join(', '));

console.log(`| Name | Site | License |`);
console.log(`| --- | --- | --- |`);
for (const pack of list) {
  console.log(
    `| ${pack.name} | [site](${pack.site}) | [license](${pack.license}) |`
  );
}

// let collection = document.getElementsByTagName('svg');
// let array = Array.prototype.slice.call(collection);
// for (const el of array) {
//   let path = el.children[0];
//   let width = window.getComputedStyle(path)['stroke-width'];
//   console.log(width);
// }
