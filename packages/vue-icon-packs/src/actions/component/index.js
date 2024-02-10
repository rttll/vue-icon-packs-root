import jetpack from 'fs-jetpack';

function template(name, svg) {
  const str = `
      <template>${svg}</template>
      <script> export default { name: '${name}'};</script>
    `;
  return str;
}

const save = (library, svgs) => {
  console.log(library.name);

  jetpack.remove(`tmp/components/${library.id}`);

  for (let svg of svgs) {
    const component = template(svg.name, svg.html);
    jetpack.write(`tmp/components/${library.id}/${svg.name}.vue`, component);
  }
};

export { save };
