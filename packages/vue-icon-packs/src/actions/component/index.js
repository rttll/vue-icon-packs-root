import jetpack from 'fs-jetpack';
import { generate } from '../../util/hash.js';

function template(name, svg) {
  const str = `
      <template>${svg}</template>
      <script> export default { name: '${name}'};</script>
    `;
  return str;
}

const save = (library, svgs, version) => {
  console.log(library.name);

  for (let svg of svgs) {
    const component = template(svg.name, svg.html);
    jetpack.write(`tmp/components/${library.id}/${svg.name}.vue`, component);
  }
};

export { save };
