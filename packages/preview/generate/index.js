import { writeFileSync } from 'fs';
import { compile } from './template.js';

import * as HI from '../src/icons/hi/hi.js';
import * as RI from '../src/icons/ri/ri.js';
import * as OC from '../src/icons/oc/oc.js';
import * as IO from '../src/icons/io/io.js';
import * as BX from '../src/icons/bx/bx.js';
import * as TI from '../src/icons/ti/ti.js';
import * as IN from '../src/icons/in/in.js';

const list = {
  hi: {
    module: HI,
    name: 'Hero Icons',
  },
  ri: {
    module: RI,
    name: 'Remix Icon',
  },
  oc: {
    module: OC,
    name: 'Octicons',
  },
  io: {
    module: IO,
    name: 'Ionic Icons',
  },
  bx: {
    module: BX,
    name: 'Box Icons',
  },
  ti: {
    module: TI,
    name: 'Tabler Icons',
  },
  in: {
    module: IN,
    name: 'Iconoir',
  },
};

// The components for each icon set
// e.g HeroIcons.vue
for (let k in list) {
  const name = list[k].name.replace(/\s/, '');
  const template = compile(k, list[k]);
  writeFileSync(`src/components/${name}.vue`, template);
}

// The components defs.
// log to console and paste into App.vue
const defs = Object.keys(list)
  .map((id) => {
    var name = list[id].name.replace(/\s/, '');
    return `
      import ${name} from './components/${name}.vue' 
    `;
  })
  .join('');

console.log(defs);

// The components tags
// log to console and paste into App.vue
const comps = Object.keys(list)
  .map((id) => {
    var name = list[id].name.replace(/\s/, '');
    return `<${name} />`;
  })
  .join('\n');

console.log(comps);
